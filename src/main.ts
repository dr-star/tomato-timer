import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {AwsRum, AwsRumConfig} from 'aws-rum-web';


try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    guestRoleArn: environment.AWS_RUM_GUEST_ROLE_ARN,
    identityPoolId: environment.AWS_RUM_IDENTITY_POOL_ID,
    endpoint: environment.AWS_RUM_ENDPOINT,
    telemetries: ['performance', 'errors', 'http'],
    allowCookies: true,
    enableXRay: true
  };

  const APPLICATION_ID = environment.AWS_RUM_APPLICATION_ID;
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION = environment.AWS_RUM_REGION;

  const awsRum: AwsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
