const voucher_codes = require('voucher-code-generator');


const generateCoupon = async (req, res) => {
    try {
        let prefix_c = req.prefix+'-';
        let postfix_c = '-'+req.postfix;
        let length_c = req.length;
        let count_c = req.count;
            
        let codes = voucher_codes.generate({
            prefix: prefix_c,
            postfix: postfix_c,
            length: length_c,
            count: count_c,
            charset: voucher_codes.charset("alphanumeric")
        });
        
        return codes;
    }
    catch (e) {
        console.log("Sorry, coupon generation failed.");
    }
};

module.exports.generateCoupon = generateCoupon;