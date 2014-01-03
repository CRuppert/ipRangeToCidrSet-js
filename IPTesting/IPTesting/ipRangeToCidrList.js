function ipRangeToCidrList() {

    this.CidrMask = [0x00000000, 0x80000000,
        0xC0000000, 0xE0000000, 0xF0000000, 0xF8000000, 0xFC000000,
        0xFE000000, 0xFF000000, 0xFF800000, 0xFFC00000, 0xFFE00000,
        0xFFF00000, 0xFFF80000, 0xFFFC0000, 0xFFFE0000, 0xFFFF0000,
        0xFFFF8000, 0xFFFFC000, 0xFFFFE000, 0xFFFFF000, 0xFFFFF800,
        0xFFFFFC00, 0xFFFFFE00, 0xFFFFFF00, 0xFFFFFF80, 0xFFFFFFC0,
        0xFFFFFFE0, 0xFFFFFFF0, 0xFFFFFFF8, 0xFFFFFFFC, 0xFFFFFFFE,
        0xFFFFFFFF];

    this.ipToNumber = function (ip) {
        var parts = ip.split(".");
        if (parts.length != 4) {
            throw ("ip address is malformed.");
        }
        var d = parts;
        return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
    };
    this.numberToIp = function (num) {
        var t = "";
        t += ((num >> 24) & 255).toString(); 
        t += ".";
        t += ((num >> 16) & 255).toString(); 
        t += ".";
        t += ((num >> 8) & 255).toString();
        t += ".";
        t += (num & 255).toString();
        return t;
    };

    this.convert = function (ipStart, ipEnd) {

        var start = this.ipToNumber(ipStart);
        var end = this.ipToNumber(ipEnd);

        var results = [];
        while (end >= start) {
            var maxSize = 32 & 0xff;
            while (maxSize > 0) {
                var mask = this.CidrMask[maxSize - 1];
                var maskBase = (start & mask) >>> 0;
                var calcMaxIp = start + Math.pow(2, (32 - maxSize));
                if (calcMaxIp > end+1) {
                    maxSize++;
                    break;
                }
                if (maskBase != start && calcMaxIp <= end) {
                    break;
                }
                maxSize--;
            }
            var x = (Math.log(end - start + 1) / Math.log(2)) & 0xff;
            var maxDiff = (32 / Math.floor(x)) & 0xff;
            if (x!= 1 && maxSize < maxDiff) {
                maxSize = maxDiff;
            }
            var newIp = this.numberToIp(start);
            results.push(newIp + "/" + maxSize);
            start += Math.pow(2, (32 - maxSize));
            var np = this.numberToIp(start);
            console.log(np);
        }
        return results;
    };
};

