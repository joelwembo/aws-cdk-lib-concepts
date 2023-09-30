import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { SecretValue } from 'aws-cdk-lib'
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import { Construct } from 'constructs/lib';
import { PipelineStage } from './PipelineStage';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

      /** GitHub Token */
    // const githubToken = secretsmanager.Secret.fromSecretNameV2(this, 'aws-github-key', props.github.tokenSecretName);
    const githubToken = SecretValue.unsafePlainText("put here here")
    // githubToken.grantRead(role);

    const pipeline = new CodePipeline(this, 'NodePipelineAWS', {
      pipelineName: 'NodePipelineAWS',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('joelwembo/aws-cdk-codepipeline-poc', 'main', {
          authentication: githubToken,
      }),
        commands: [
          'npm ci',
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'cdk.out'
      })
    });

    const testStage = pipeline.addStage(new PipelineStage(this, 'PipelineTestStage', {
      stageName: 'test'
    }));

    testStage.addPre(new CodeBuildStep('unit-tests', {
      commands: [
        'npm ci',
        'npm test'
      ]
    }))

  }
}
