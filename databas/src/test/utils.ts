

function testDecorator(testName: string) {
	return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
	  const originalMethod = descriptor.value;
	  descriptor.value = function (...args: any[]) {
		test(testName, async () => {
		  await originalMethod.apply(this, args);
		});
	  };
	};
  }


export {
	testDecorator
}