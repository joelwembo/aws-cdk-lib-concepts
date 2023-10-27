"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const cdk8s_1 = require("cdk8s");
describe('Placeholder', () => {
    test('Empty', () => {
        const app = cdk8s_1.Testing.app();
        const chart = new main_1.MyChart(app, 'test-chart');
        const results = cdk8s_1.Testing.synth(chart);
        expect(results).toMatchSnapshot();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQStCO0FBQy9CLGlDQUE4QjtBQUU5QixRQUFRLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtJQUMzQixJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUNqQixNQUFNLEdBQUcsR0FBRyxlQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxjQUFPLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzdDLE1BQU0sT0FBTyxHQUFHLGVBQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge015Q2hhcnR9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQge1Rlc3Rpbmd9IGZyb20gJ2NkazhzJztcblxuZGVzY3JpYmUoJ1BsYWNlaG9sZGVyJywgKCkgPT4ge1xuICB0ZXN0KCdFbXB0eScsICgpID0+IHtcbiAgICBjb25zdCBhcHAgPSBUZXN0aW5nLmFwcCgpO1xuICAgIGNvbnN0IGNoYXJ0ID0gbmV3IE15Q2hhcnQoYXBwLCAndGVzdC1jaGFydCcpO1xuICAgIGNvbnN0IHJlc3VsdHMgPSBUZXN0aW5nLnN5bnRoKGNoYXJ0KVxuICAgIGV4cGVjdChyZXN1bHRzKS50b01hdGNoU25hcHNob3QoKTtcbiAgfSk7XG59KTtcbiJdfQ==