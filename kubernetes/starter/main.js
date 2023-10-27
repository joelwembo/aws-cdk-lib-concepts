"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyChart = void 0;
const cdk8s_1 = require("cdk8s");
// imported constructs
const k8s_1 = require("./imports/k8s");
class MyChart extends cdk8s_1.Chart {
    constructor(scope, id, props = {}) {
        super(scope, id, props);
        const label = { app: 'hello-k8s' };
        // notice that there is no assignment necessary when creating resources.
        // simply instantiating the resource is enough because it adds it to the construct tree via
        // the first argument, which is always the parent construct.
        // its a little confusing at first glance, but this is an inherent aspect of the constructs
        // programming model, and you will encounter it many times.
        // you can still perform an assignment of course, if you need to access
        // attributes of the resource in other parts of the code.
        new k8s_1.KubeService(this, 'service', {
            spec: {
                type: 'LoadBalancer',
                ports: [{ port: 80, targetPort: k8s_1.IntOrString.fromNumber(8080) }],
                selector: label
            }
        });
        new k8s_1.KubeDeployment(this, 'deployment', {
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
                                ports: [{ containerPort: 8080 }]
                            }
                        ]
                    }
                }
            }
        });
    }
}
exports.MyChart = MyChart;
const app = new cdk8s_1.App();
new MyChart(app, 'hello');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaUNBQStDO0FBRS9DLHNCQUFzQjtBQUN0Qix1Q0FBeUU7QUFHekUsTUFBYSxPQUFRLFNBQVEsYUFBSztJQUNoQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLFFBQW9CLEVBQUc7UUFDL0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUM7UUFFbkMsd0VBQXdFO1FBQ3hFLDJGQUEyRjtRQUMzRiw0REFBNEQ7UUFDNUQsMkZBQTJGO1FBQzNGLDJEQUEyRDtRQUMzRCx1RUFBdUU7UUFDdkUseURBQXlEO1FBRXpELElBQUksaUJBQVcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQy9CLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsY0FBYztnQkFDcEIsS0FBSyxFQUFFLENBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxpQkFBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFFO2dCQUNqRSxRQUFRLEVBQUUsS0FBSzthQUNoQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksb0JBQWMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3JDLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsQ0FBQztnQkFDWCxRQUFRLEVBQUU7b0JBQ1IsV0FBVyxFQUFFLEtBQUs7aUJBQ25CO2dCQUNELFFBQVEsRUFBRTtvQkFDUixRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO29CQUMzQixJQUFJLEVBQUU7d0JBQ0osVUFBVSxFQUFFOzRCQUNWO2dDQUNFLElBQUksRUFBRSxrQkFBa0I7Z0NBQ3hCLEtBQUssRUFBRSxpQ0FBaUM7Z0NBQ3hDLEtBQUssRUFBRSxDQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFFOzZCQUNuQzt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBM0NELDBCQTJDQztBQUVELE1BQU0sR0FBRyxHQUFHLElBQUksV0FBRyxFQUFFLENBQUM7QUFDdEIsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzFCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQXBwLCBDaGFydCwgQ2hhcnRQcm9wcyB9IGZyb20gJ2NkazhzJztcblxuLy8gaW1wb3J0ZWQgY29uc3RydWN0c1xuaW1wb3J0IHsgS3ViZURlcGxveW1lbnQsIEt1YmVTZXJ2aWNlLCBJbnRPclN0cmluZyB9IGZyb20gJy4vaW1wb3J0cy9rOHMnO1xuXG5cbmV4cG9ydCBjbGFzcyBNeUNoYXJ0IGV4dGVuZHMgQ2hhcnQge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQ2hhcnRQcm9wcyA9IHsgfSkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgbGFiZWwgPSB7IGFwcDogJ2hlbGxvLWs4cycgfTtcblxuICAgIC8vIG5vdGljZSB0aGF0IHRoZXJlIGlzIG5vIGFzc2lnbm1lbnQgbmVjZXNzYXJ5IHdoZW4gY3JlYXRpbmcgcmVzb3VyY2VzLlxuICAgIC8vIHNpbXBseSBpbnN0YW50aWF0aW5nIHRoZSByZXNvdXJjZSBpcyBlbm91Z2ggYmVjYXVzZSBpdCBhZGRzIGl0IHRvIHRoZSBjb25zdHJ1Y3QgdHJlZSB2aWFcbiAgICAvLyB0aGUgZmlyc3QgYXJndW1lbnQsIHdoaWNoIGlzIGFsd2F5cyB0aGUgcGFyZW50IGNvbnN0cnVjdC5cbiAgICAvLyBpdHMgYSBsaXR0bGUgY29uZnVzaW5nIGF0IGZpcnN0IGdsYW5jZSwgYnV0IHRoaXMgaXMgYW4gaW5oZXJlbnQgYXNwZWN0IG9mIHRoZSBjb25zdHJ1Y3RzXG4gICAgLy8gcHJvZ3JhbW1pbmcgbW9kZWwsIGFuZCB5b3Ugd2lsbCBlbmNvdW50ZXIgaXQgbWFueSB0aW1lcy5cbiAgICAvLyB5b3UgY2FuIHN0aWxsIHBlcmZvcm0gYW4gYXNzaWdubWVudCBvZiBjb3Vyc2UsIGlmIHlvdSBuZWVkIHRvIGFjY2Vzc1xuICAgIC8vIGF0dHJpYnV0ZXMgb2YgdGhlIHJlc291cmNlIGluIG90aGVyIHBhcnRzIG9mIHRoZSBjb2RlLlxuXG4gICAgbmV3IEt1YmVTZXJ2aWNlKHRoaXMsICdzZXJ2aWNlJywge1xuICAgICAgc3BlYzoge1xuICAgICAgICB0eXBlOiAnTG9hZEJhbGFuY2VyJyxcbiAgICAgICAgcG9ydHM6IFsgeyBwb3J0OiA4MCwgdGFyZ2V0UG9ydDogSW50T3JTdHJpbmcuZnJvbU51bWJlcig4MDgwKSB9IF0sXG4gICAgICAgIHNlbGVjdG9yOiBsYWJlbFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbmV3IEt1YmVEZXBsb3ltZW50KHRoaXMsICdkZXBsb3ltZW50Jywge1xuICAgICAgc3BlYzoge1xuICAgICAgICByZXBsaWNhczogMixcbiAgICAgICAgc2VsZWN0b3I6IHtcbiAgICAgICAgICBtYXRjaExhYmVsczogbGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICBtZXRhZGF0YTogeyBsYWJlbHM6IGxhYmVsIH0sXG4gICAgICAgICAgc3BlYzoge1xuICAgICAgICAgICAgY29udGFpbmVyczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2hlbGxvLWt1YmVybmV0ZXMnLFxuICAgICAgICAgICAgICAgIGltYWdlOiAncGF1bGJvdXdlci9oZWxsby1rdWJlcm5ldGVzOjEuNycsXG4gICAgICAgICAgICAgICAgcG9ydHM6IFsgeyBjb250YWluZXJQb3J0OiA4MDgwIH0gXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xubmV3IE15Q2hhcnQoYXBwLCAnaGVsbG8nKTtcbmFwcC5zeW50aCgpOyJdfQ==