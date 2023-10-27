import { Construct } from 'constructs';
import { App, Chart, ChartProps } from 'cdk8s';

// imported constructs
import { KubeDeployment, KubeService, IntOrString } from './imports/k8s';


export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = { }) {
    super(scope, id, props);

    const label = { app: 'hello-k8s' };

    // notice that there is no assignment necessary when creating resources.
    // simply instantiating the resource is enough because it adds it to the construct tree via
    // the first argument, which is always the parent construct.
    // its a little confusing at first glance, but this is an inherent aspect of the constructs
    // programming model, and you will encounter it many times.
    // you can still perform an assignment of course, if you need to access
    // attributes of the resource in other parts of the code.

    new KubeService(this, 'service', {
      spec: {
        type: 'LoadBalancer',
        ports: [ { port: 80, targetPort: IntOrString.fromNumber(8080) } ],
        selector: label
      }
    });

    new KubeDeployment(this, 'deployment', {
      spec: {
        replicas: 2,
        selector: {
          matchLabels: label
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                name: 'hello-kubernetes',
                image: 'paulbouwer/hello-kubernetes:1.7',
                ports: [ { containerPort: 8080 } ]
              }
            ]
          }
        }
      }
    });
  }
}

const app = new App();
new MyChart(app, 'hello');
app.synth();