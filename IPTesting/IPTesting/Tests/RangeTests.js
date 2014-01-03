///<reference path="/lib/Base.min.js"/>
///<reference path="/lib/iplib.js"/>
///<reference path="/lib/jasmine.js"/>
///<reference path="/ipRangeToCidrList.js"/>
describe("FixedLengthCollection push Tests", function() {
    var converter = new ipRangeToCidrList();

    beforeEach(function () { });
    
    it("should convert an Ip to a Number and back again", function () {

        var ip = "192.168.1.1";

        var num = converter.ipToNumber(ip);

        var ipRevert = converter.numberToIp(num);
        expect(ipRevert).toBe(ip);
    });
    it("should convert an Ip range to a list of cidr ranges", function () {

        var ipStart = "192.168.1.25";
        var ipEnd = "192.168.1.55";

        var cidrs = converter.convert(ipStart, ipEnd);

        
        expect(cidrs.length).toBe(5);
    });
    it("should convert a 1 increment Ip range to a single cidr ranges", function () {

        var ipStart = "192.168.1.32";
        var ipEnd = "192.168.1.33";

        var cidrs = converter.convert(ipStart, ipEnd);


        expect(cidrs.length).toBe(1);
    });
    it("should convert a 3 increment Ip range to a single cidr ranges", function () {

        var ipStart = "192.168.1.32";
        var ipEnd = "192.168.1.35";

        var cidrs = converter.convert(ipStart, ipEnd);


        expect(cidrs.length).toBe(1);
    });

    it("should convert a large single subnet Ip range to a set of cidr ranges", function () {

        var ipStart = "192.168.1.88";
        var ipEnd = "192.168.1.254";

        var cidrs = converter.convert(ipStart, ipEnd);
        var ranges = [
            "192.168.1.88/29", "192.168.1.96/27", "192.168.1.128/26", "192.168.1.192/27", "192.168.1.224/28", "192.168.1.240/29", "192.168.1.248/30", "192.168.1.252/31", "192.168.1.254/32"
        ];
        for (var i = 0; i < ranges.length; i++) {
            expect(cidrs[i]).toBe(ranges[i]);
        }
        expect(cidrs.length).toBe(9);
    });
    it("should convert a full range single subnet Ip range to a set of cidr ranges", function () {

        var ipStart = "192.168.1.2";
        var ipEnd = "192.168.1.254";

        var cidrs = converter.convert(ipStart, ipEnd);
        var ranges = [
            "192.168.1.2/31"
            ,"192.168.1.4/30"
            ,"192.168.1.8/29"
            ,"192.168.1.16/28"
            ,"192.168.1.32/27"
            ,"192.168.1.64/26"
            ,"192.168.1.128/26"
            ,"192.168.1.192/27"
            ,"192.168.1.224/28"
            ,"192.168.1.240/29"
            ,"192.168.1.248/30"
            ,"192.168.1.252/31"
            ,"192.168.1.254/32"
        ];
        for (var i = 0; i < ranges.length; i++) {
            expect(cidrs[i]).toBe(ranges[i]);
        }
        expect(cidrs.length).toBe(13);
    });
    it("should convert a wide range multiple subnet Ip range to a set of cidr ranges", function () {

        var ipStart = "192.168.1.2";
        var ipEnd = "192.168.3.155";

        var cidrs = converter.convert(ipStart, ipEnd);
        var ranges = [
            "192.168.1.2/31"
            ,"192.168.1.4/30"
            ,"192.168.1.8/29"
            ,"192.168.1.16/28"
            ,"192.168.1.32/27"
            ,"192.168.1.64/26"
            ,"192.168.1.128/25"
            ,"192.168.2.0/24"
            ,"192.168.3.0/25"
            ,"192.168.3.128/28"
            ,"192.168.3.144/29"
            ,"192.168.3.152/30"
        ];
        for (var i = 0; i < ranges.length; i++) {
            expect(cidrs[i]).toBe(ranges[i]);
        }
        expect(cidrs.length).toBe(12);
    });
});
