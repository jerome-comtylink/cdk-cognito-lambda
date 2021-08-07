import { Function, Code, Runtime } from '@aws-cdk/aws-lambda';
import { AccountRecovery, CfnUserPool, UserPool, UserPoolTriggers } from '@aws-cdk/aws-cognito';
import * as cdk from '@aws-cdk/core';

export class CdkCognitoLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new Function(this, 'MyFunction', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hello world"); }')
    });

    new UserPool(this, `userpool-1`, {
      userPoolName: 'userpool',
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      autoVerify: {
        email: true,
      },
      lambdaTriggers: {
        preTokenGeneration: fn,
      },
    });
    

    const userPool = new UserPool(this, `userpool-2`, {
      userPoolName: 'userpool',
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      autoVerify: {
        email: true,
      },
      lambdaTriggers: {
        preTokenGeneration: fn,
      },
    });

  }
}
