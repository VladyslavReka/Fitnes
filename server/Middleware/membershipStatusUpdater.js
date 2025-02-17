import cron from 'node-cron';
import ClientMembership from '../Models/clientMembership.js'; 

cron.schedule('0 0 * * *', async () => {
  try {
    const expiredMemberships = await ClientMembership.find({
      status: 'active',
      endDate: { $lte: new Date() },
    });
    if (expiredMemberships.length > 0) {
      // Оновлюємо статус на expired
      await ClientMembership.updateMany(
        { _id: { $in: expiredMemberships.map((m) => m._id) } },
        { $set: { status: 'expired' } }
      );
      console.log(`Оновлено статус для ${expiredMemberships.length} записів.`);
    } else {
      console.log('Немає записів для оновлення.');
    }
  } catch (error) {
    console.error('Помилка під час оновлення статусу:', error);
  }
});