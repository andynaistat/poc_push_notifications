import { Body, Controller, Post } from '@nestjs/common';
import * as webpush from 'web-push';

const subscriptions: any[] = [];

@Controller()
export class AppController {
  constructor() {
    webpush.setVapidDetails(
      'mailto:test@example.com',
      process.env.VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!
    );
  }

  @Post('subscribe')
  subscribe(@Body() sub: any) {
    subscriptions.push(sub);
    return { message: 'Subscribed' };
  }

  @Post('send')
  sendNotification() {
    if (!subscriptions.length) {
      console.log('❌ No hay suscripciones registradas');
      return { message: 'No hay suscripciones registradas' };
    }

    const payload = JSON.stringify({
      title: '🎉 ¡Notificación recibida!',
      body: 'Este es un mensaje de prueba desde el frontend.',
      url: 'https://andynaistat.github.io/poc_push_notifications/',
    });

    subscriptions.forEach((sub) => {
      webpush.sendNotification(sub, payload).catch((error) => {
        console.error('Error al enviar notificación:', error);
      });
    });

    return { message: 'Notificación enviada' };
  }
}
