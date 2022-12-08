const fs = require("fs");
const { performance } = require("perf_hooks");

import "../lib/array";

const t0: number = performance.now();

const markerLength: number = 14;

// const data = fs.readFileSync("data.txt", "utf-8");
const data: string[] =
    "hrbbjllllspssblslvvrdrbbpbbmcccfppvbbwvbbmrmjrjrfrgfgbffgfqfqlltlwttscsncscchssrppffvwwvvpnnwwwpvwvhhnvhhbttvzzdlzdlzzwmmjhhznnjdnnnqddbtdbdbsdsmdsdrrdpdwpdppgcgqgcctftsfszslljbljbjwbwbnwnqqrnnztntmtrmmzwzdwzwgwwwjhjsjgjtjjhpjhhppqzqdqffrvrtvvsmmgwmgwgbbclltctptzpzhpzptzppcfpcfftflfzftztddzgzmmfsmsrmmsstttvbvmbvvsmsqmqlldjdtthwtwbwggrzzjrzrcctffsshqshhpthhlnhlhqhdqqrwrmmcttpfttzfzgzdgdzzwrrtsrrsnrnccrbbsssbpbjjvzzwlwtwjwsjwjggzqgzzrsszzjnzjzwjzzcrzczncnqqztzfzhfhvvtjvjdvjjmrjrppvzppczpczcggshghvhnhhsrsnsdszzdpzpzlpzzhwwmnwmwmcwwfnwfwjjcbcncllcsllqdqzzhqhmqmbbjvjjwwcjjpnpllzfzddtmtccqrcrtrwrpphpmpplslmltthnnvhhvrvbblhhrrdqqmbqqgtqggdgcdcvvsbsswvvpggbbtftlflglzlmlbbfhhrshswhshffhhdnnrfrvrmrnrprrmfmpmnpnfnggvvcncdcrczrzccpmmssrbbdjdtdrdwrrwhrrvrtvvszvvwvzzmhhjhhwlhlqlvlttzftztdtstftrfrdddmtmzzsqzqvvpdpdcpcncnrrtntznzrzgznztnznhhsqqnrqrhhlzhzthhfddrzdrrqmqggcmmllnjjvwwjccfjfqfcfzccwvcwvcvjcjtjtnnqsqmqrmrzrszrszzfwfggnmmcdmdjmmhwwgfwfnwnlwwcffsrffvnvbvnvwnwgnwnmmbzbmbpplmplpspzpmzpzdzgzrzrtrjrbbppwvwgwmggqwgghqqshhcwcqwcqcfcbbnsnrrtztzrtrvtvhthzhmmrqqrwqqsjqjcctgtwthhqmmnffmgmdgdlgljjhwjwggrqqfrqqjvqvhqqgsqsgsttmrrbprbppmjppslpsllvlfvlvrvhvtqmrjcdzwsbzfmgmwmwqwhztqrsdzhqjqvbjbntnbndflthljcczdmmhszfgsplrtlqnfzbrlqngwdqtfwcmrdjrsmdpmjmqwrbwfjzwnvqhfmlqtvvnlfzbfccwslqpbzzjccbvrzhghqwtvqgwrmsfzqnmnqqjsjtpcmngpqgllfsnpqtjjbqcdppnsmtwrslnrbqtwvnbctzvwfmgctscmzjbqqgqdwbpzmrdwgfcjzftzgmfcjhchbnmnqnrgtqngwrmncjvptqqdtjtgtpzzdrfsdgmwlwrjnqldbwrqjrhwcczlzvlhpgrnwzhbwjnpthggczfgtrjnzvnlfdfbwcnzfbwlwlmgnnjnpvhbhqgnzhqsnmvbcftsmrcgpvnnnmgnrvpbzlpwnbwpzmwpgqvbfgjwfrjqnvvgmqwwcfddqmdznmfhpjcfgptqdqwmplrglbwlmsqzjshrlhflcjvptgrcfhjfgqmlfzrtphpbvcqzwpcnwljjdlmqzhcctqshdngrgtlfsrfccdtlvmqcdgnpcvphdsrpzfzwclvsqcpzqlfvvqzggdhpfzdvhshglvfzfmcllrdfjfsjtngjgddcpqnlmrnplwtlvwdvzftltnsnspcdztgqhlhvvbnwvnmhscfnqbngpvprzfrjcmfpfzfftrlnwgllhnjndpjdrwcgqpcgcqngnbfzlvzvhnqdjthflmwvppmbdssddmgsbgrqnpjzrjpzdddqgsdlmwnhhpjbthclvqhgrsnrbqgtnsjhncnzbhrdgftvbptrqssvsqfpqnddhmgwcrfqndqjsqgffmhdvqhjrdlmrlcqctqccprwlbqgqrwmtfhwmfjfqzdqbsdsjbtsvfvgbsrvqwnqqqqthpsqgcfslsqtnjwtsrcdcctggdghrjwpbfccrtwgszwbrsjswmjmjbcqrsgbcfsdjzsbjnnssnddnnvwgftlrqvphnqcgjszscrlhhjnljlqcjqtqfwbmdmrgdlcqqwmbsmsdhpplvlfglqwspbfptlbzqjwhqmfvzvsvpjclcdzsbvntmhdqdvhghcmmflpjbglsghbswdshtsbdrgpsrsclrmfwwqbrgdjsqztgttqpwhnfhszlgbfpzhczsnwqflmshlgbrpmdzgpqwtsbssgfjbtrwbmztlwwfmsdgpgfgdjfdccwlfgztbcbqjvjtvslmddjplrswwcszspgplsrhrnwnmrrfbcgdmntcrlvnfqtwwcczsglrhtrfqnmhvgzjpmlplqvqhmnfgvzqcmzhqszgslvndqtqhvrbvbmclbcbjdswvcjrzgfdmdwnnlzlzqcffsrqdfmmpzfnmdsnqlpcrhzsdnsflblcjsfsgcnsspftjrlmdjsmfpqtmlgfvnlfnjscsgwzwvpjrvvclhsbqldlnmtglhbjfwlzmvrbvgtprfjbjhhnlqnbrswwlqtcgrjrltdrnfrjhrntllptlsbhqrwvdsfrlghtfcndznzjwcgmtdvffltgrdmljlqhdtmdvnfsfsrvdpmhlrrsttvqlwfptddwbpfrbclwwzmfpttmrmmqzjnbbnnfvzwmmcfshvrlbdbjzprftbqvdsghnnzwbjccpthdsvsdlgvphsgjdqjwsgmzqnqpqvgqjvwgjtzpmqqwnlwrwhqqjjclcbhjgpwhqdclwmqfmwbwmwwvcbhfznfhcfbprfcdqlbcttnvgnjwswcmpbrghtzgdbppbprffzjgvddzpwmdctrhnrfzdfhtmnfrsfdqvzcnrtncflhvldcndwqtvbggmwlzhchlcwtcbqcvlfhdwljgddwpvcfczvfqmphgtdsnsqwdpvvmwnwqjbrjwbdhhgtffphsdrvspsbgmfrmwmhnrgqdfppzgfpgmqjcsnglczgwhjthfhztzrlpgzjhcfrjpjvtjptptbvflftjtcfhmbwlhlbhvnjnbfmwjrgbvvhmdlncdgncgfjcnnpdljfcjsmsfscqpwsgcmlhhqmldsnjfrrqpghwncmgwgnjsdtvbhrbbnmpqjrrctqqnqzztmbqmdsgdvmmlwmbvprllzgntnmttrlzrttmjjlrwpwmtfznmwnsjmjhjdnsppfhcrjpzhjqzdtdbsjshfzzvrwvjbjbgtsfpgggbdztczwlhpmthfjdgsbrvlwmlrvgdrpjzccwmgpcnqqzmqdjqmwsrzwsmtmdjdhmjrwfwnzlmfnqtcgtslwtlnwhvmqntmglhntnsjlnmzfvfdztcfwmpchsrsdmqvqcwljzrmmssjvbmvvnmqlbsdwnrbmqctdtmfzlgfzpmjcnftgftvjpfbwwmzfdrrwjwcfwfcfmzbbnppgjrmbcvmvnjpdrzmvndvddtvshlnjjwgtsvnwtwnhcbfpnthpjlrhgrqccdgppjvdqjwqrfrrgnvhfwvjhnwhntnpmghphrtgqhwtbrqhqljfdjbgnlgmqqgfcqpqfhcpgspdbvlbfjvlrgmtjztwdzlrhqwwtcpdvsqgssjbjjgqlwbcctzzqvvmdzpfrmspmqhtzwgcfsslpnhpjfwqrrfbwbndrvhnnsjnlvlvqdsgwzjsrprhgtvsfbhbcpljdczbtdwzcnhzntrwcrjctmhtjfdlthznzmqblppzcqgpjhlzjrmcvpptfjjzltdhmvwphwlccscwrwfcqpqwwrzcmnltzdcfvtjrcvsqwtchrmdfzjmzjfhppjzbhglwqggzqqnspfmzrfwrqdqdrsdbsdhcgdqrrnjlwrqhfhpzjhrvjndqphndnnnbwhrjvqrrbvlhhbljjcwmfpvnhcszfshlsnczgtcfhjslbhzczdqdmdnvqdzhbmbpcnbntwgllfscrcwhfrgtfvftmwhbgfhjzjrbvvwc".split(
        ""
    );
const testData1: string[] = "bvwbjplbgvbhsrlpgdmjqwftvncz".split("");
const testData2: string[] = "nppdvjthqldpwncqszvftbrmjlhg".split("");
const testData3: string[] = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg".split("");
const testData4: string[] = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw".split("");

Array.prototype.findFirstMarker = function (size = 4) {
    return this.windowed(size).findIndex(
        (window) => window.containsOnlyUnique()
    );
};

const processEntries = (data: string): string[] => {
    return data.split("");
};

const allUnique = (marker: string[]): boolean => {
    const markerSet: Set<string> = new Set(marker);
    return markerSet.size === marker.length;
};

console.log(data.findFirstMarker(4));
console.log(data.findFirstMarker(14));


// const findStartMarker = (stream: string[], markerLength: number = 4): number => {
//   return stream.windowed(markerLength, (window) => window).findIndex(window => {
//     return window.toSet().size === window.length
//   });
// }

// const findStartMarker = (stream: string[], markerLength: number = 4): number => {
//   for(let i = 0; i + markerLength < stream.length; i++) {
//     if(allUnique(stream.slice(i, i + markerLength))) return i + markerLength;
//   }
//   return 0;
// }

// console.log(findStartMarker(data, 4));
// console.log(findStartMarker(data, 14));

const t1: number = performance.now();

console.log(`Elapsed: ` + (t1 - t0));
