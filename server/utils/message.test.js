let expect = require('expect');
let {generateMessage} = require('./message');

describe('generateMessage',() => {
    it('Should generate the correct message object',() => {
         let message = generateMessage('pelumi','Hello From New Genesis'),
                from = 'pelumi',
                text = "Hello From New Genesis";
         expect(message).toMatchObject({from,text})
         expect( typeof message.completedAt).toBe('number');
    });
});