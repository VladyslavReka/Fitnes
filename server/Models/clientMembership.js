import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clientMembershipSchema = new Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }, // посилання на клієнта
  membershipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership', required: true }, // тип абонемента
  startDate: { type: Date, default: Date.now },
  endDate: {
    type: Date,
    required: true,
    },
  status: { type: String, enum: ['active', 'expired'], default: 'active' },
});

export default mongoose.model('ClientMembership', clientMembershipSchema);