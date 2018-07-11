let expect = require('expect');
let {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',() => {
    it('Should generate the correct message object',() => {
         let message = generateMessage('pelumi','Hello From New Genesis'),
                from = 'pelumi',
                text = "Hello From New Genesis";
         expect(message).toMatchObject({from,text})
         expect( typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage',() => {
    it('Should generate the correct location message object', () => {
     let from = 'pelumi',
         lat  = 2345,
         lng  = 4789;
         url = `https://www.google.com/maps?q=${lat},${lng}`;
        let message = generateLocationMessage(from,lat,lng);
        expect(message).toMatchObject({from,url});
        expect(typeof message.createdAt).toBe('number');
    })
})