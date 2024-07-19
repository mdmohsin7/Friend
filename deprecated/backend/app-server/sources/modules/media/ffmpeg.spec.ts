import { combine, metadata } from "./ffmpeg";
import * as tmp from 'tmp';

describe('ffmpeg', () => {
    it('should combine files', async () => {
        let output = tmp.tmpNameSync({ postfix: '.m4a' });
        let chunks = [
            '0000001C667479704D344120000000004D34412069736F6D6D703432000000016D64617400000000000006E900D0400701049FCC3F37F988D119244EFAF96B98C739ADFA14DBD69B5EC11C5349566112BE579B625D25362D88BBBC9BE49A84416EFC990213219BA1898555033FA36E2EA1659C593538312652DBC0CEA196D3F65B385522EF6DA353831C69BFEC53F4C7D7EE0B0FD132CD7D6993E0B8C6741FD97B0A4D0D140EA1F76E8DDEF6CF03E4890BAE3BADF9DE77AA6F5D45B1971B09F0917523570541E6DCC7B8EFD2BB18F4E787BAC8ABDEF5F2E36CAB14F31A30E63468BEABF65D8EFA0BBE3F82C7BE539C0BDEBA176FA515EDE4A9F0478C8D7B792DA36EBDAC6B70CF57E84BD978BDAC757D47B790EF71B93128871455EF59821AF727C380012AD42C722B14E8C2A657866B360A2A9C85509802F0502FDBB0D9CA3442942A561EA5EEA5A4C30C04638EAFF6DE1800C30C89AB96A1AB228A018E3D8FA26965201FB1EAE38C065965F35DCE00638F43F9665900CB2FD2FA5C7100E4797A0178E3F50CA4032E1E8802F1EFF200575A0065D1688031E4F0A4015C5001DE4002F93948032E5E2007519001BF4000CBA7001C4D2001CC001C304FFE981C7DB200BF80017EEE0007BFB64017E6003F5800EED0018FB72007AFB400AFD000BC7F5C802B87B7000BFC6000F68015EFE40E0126142C2C1B1806C221B0CD5D4ECCC065233188DB2D4294902598CAC68251E9141A38508E9A01460E698580AC5740DFC50007FF1E00000AA87D34E1600065FC27C4C003F75EA600BE77DC68019FF89F07000E57F0400DDF479005FA2E60073FE2400AF879005FB7E8801DEE9000F240038FB000EF780005F8E001C6D8006FF6800BF1000AEEB000377B4003D4000EE32003A344007A1001C8DA007469800EA4006AED002BCE003C7001DCE6006BF7C003D58017EEF4400E9E1000F54003ABE6070126142C6C1B0806C201B0806C324B0C99E453BE5A66EB4E606F1B914A464BC16AC674281C40AC84C46B48FCF89B98FE14C01C19053A7E1B240E5007EC0A00008BCCD7800285A457E0E0003F56FCCC00D7FD1A4000065280131A000FC30037FDDAC0197E91D74003D1FD4800DFFFE62007BDE7003D7A001EC00076320074F9800AF92005FBBC400AF6800AEC40072F6001D1C1001E1800EAB6001E4D3001ED8015EEB00035BBF001E1000EC368017E7001D8000D9CE0079794003E4000F4BC3003A780003D0800F5F1070124142CE81A0A06C281B0B06747ABA77141D89DCB66E260AB61284B13EE7BDA3774451A216EBA7EE0EDDFED45D908705469CF328848B3AC07FC1171A9C72D02438E7E5A64B871CB10C7C3D2FFC894B890607871CEEF611841233FC4175C5C9E90A08805518DFF1CD0CC066EFF8398061ABEA7380150FAEE84003C368005BB5EFF300AD4F3D9003D95001CFD0002BBBC802BA0DA006FF010009EB8007174C00DDC1002FBB0017D4800E758017C8002FC3EC0039DDF8011E400069EC0033EB800771002BAA80039FA40039E005769200AE4F000079B00275348008F40003AE001C9DB01C00132142CF03A0A0682EC56B88C531DDB2DCC2064BDD6A8629272B453945123F11089FD222687A93F61634887BE6ECD3E72C60AD671511AD4E10E8BFA87FEDA1654CC483BCA469AFFCDB6FB81553A6406991169DD7E560073802B000B55D667840C3434858760F4A2054704E586FDFF03D1F36334945CF47B9ED134B427778BE34CA2D49737F8B1B884D2E3675FEA6EAA658DD6EF1FDA9CA9710CAB5FD373CC0A17BB3406378EAE3E0CCC649567B379A02B39EEEC00C63189C02F18C7CF002B3F0F876640CD0CAC18EFF9FD38905CB3DDD1280ACF67D5C3280CAF1FC2804E31DB1204B3EFF64C05D33C7AB700ABBC7D7BB4889BAC7C3004C67BBEEC450B984F3F18055B1EEE9D2466D51FF5D490C4547F2F9E689B998D5E9F93A585A159E18EBF59C3C31532BAADBE9BD1F234125A2F95E0E5490A67E874A80ABCFA8F3C40E0012C14212CE13A1D8301A089B0CB0839EA37C69ABB99DCA6462D15C49A2001E03ECAA75B5499293F46471ED6CA7DAD24C948AA2C5B6C645F9A9164A848913A4B11AA607D950A179AC31275140A64D89E9BB879B74BA2B5629299FB7AF7F0C6B1687BE8EDD796AC6DA991EF9BBB9ECEDEBBA464759B759A3C9AE7929475C6B97C3BACA1CD085887CDBB3D182CCE34DDABAF7E9F0DCB313D3186BCB575DB5032446FD9F02993D7AC5BF96381975F83DC4B1FA2F157F9EFD8941BF65C7B44D545CEBE19F9D2B2D8338F7F59E4689F04A54CA9F009E47F2224F0F3DF81FC9894D6F13E33F561935A2FF35FFC8F15B4CFF46FA27CB4ABA2FA37C33E5256545FB2E3DF59AAAB067E77FAC9955819FD27E972CCE6071563BB9E554CE6828F4F2CF8EAC48504418132233290CC75A968171675180B784B52C210E57ABE0569E65325761B758F79E3D83BC58A056B25F65E7AD7C677EB3E5B8A837D64BABAF16AE3BAB5CF5DC9377D4DC0000003626D6F6F760000006C6D76686400000000E238B29CE238B29E00001F4000000BC00001000001000000000000000000000000010000000000000000000000000000000100000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002000001F47472616B0000005C746B686400000001E238B29EE238B29E000000010000000000000BC0000000000000000000000000010000000001000000000000000000000000000000010000000000000000000000000000400000000000000000000000000001906D646961000000206D64686400000000E238B29EE238B29E00001F400000200055C400000000003168646C720000000000000000736F756E000000000000000000000000436F7265204D6564696120417564696F00000001376D696E6600000010736D686400000000000000000000002464696E660000001C6472656600000000000000010000000C75726C2000000001000000FB7374626C00000067737473640000000000000001000000576D7034610000000000000001000000000000000000020010000000001F40000000000033657364730000000003808080220000000480808014401400180000003E8000003E800580808002158806808080010200000018737474730000000000000001000000080000040000000028737473630000000000000002000000010000000700000001000000020000000100000001000000347374737A00000000000000000000000800000004000000F3000000CE000000C1000000CA000000E40000013F00000166000000187374636F00000000000000020000002C0000059F000000FA75647461000000F26D657461000000000000002268646C7200000000000000006D6469720000000000000000000000000000000000C4696C7374000000BC2D2D2D2D0000001C6D65616E00000000636F6D2E6170706C652E6954756E6573000000146E616D65000000006954756E534D5042000000846461746100000001000000002030303030303030302030303030303834302030303030303330302030303030303030303030303031344330203030303030303030203030303030303030203030303030303030203030303030303030203030303030303030203030303030303030203030303030303030203030303030303030',
            '0000001C667479704D344120000000004D34412069736F6D6D703432000000016D64617400000000000006AB00D0400701149FCC3F37F9A2D21232485939E3BAEBB719D67895F9DE657C3E6F86640233C04988C9A8969C45E224D81322E5607E26B33CB09A995661789F906062D19B2C820FE8FF502612ED4BEFC630DDC5E6FDD5D9921C69F83F74B870426D79EBA1F9FB5AFEC7A2F2F4FA0FF350A3FBB59A297CDF55A08B5823F256A16CF3724D16620506EEBB0C4C83CB84CA185AEDD515D54794DC8394BAEFDE72C3DB42D149185465E24A513664D3B3B6F1E81182ADB926C8BA0232B72782DFBECD7F13549323E6B55295731D15E39DCE5E3332C93DECD84C26C69EE79568D80CF3720B6F494AD794526E619155C0B8CCBAB08D154C5C775E3CCA5AA4B66E77CF3AEAE00132D42C73E30B98EDB06C86D32CA817B600144A7158C519D5C6AE3AA2D3D4BEB4EA4C7860231C757F91D380565971BF52E4E8818E3ABE93F80E3696520CB2FBBF171C600769E0E80BC71E2FD7329032CB5BE37DC71C405E3E0B2900C3CA8019776D10063D4F5D90035BBAC001D540031EF74A401ADCF8003A880039F5200CBA3001E12800DF80019777B003A0C800BE00013D3E213FFA20579A000EDA0018F53C2C8032E376B8802FC60031EE7680565D96FC402F1F4996400F4FA200CB8DE8C018E3F2329015970FB5C6002FEEE40171EA64032CBC6ED7181C0128142C2A1B0A86C201B0886C326B0CB9D4F7850A6E43928DD860308142C96C425E8A6425F39655341800031EFC107490A3005743790000433B92C501C2C0009FD77CBC003D3BF0C017DE7E3F4000023F195728002FE9400D6FB3C802FE6EC00F3BE84009FA79003B38003CEC8017E480074FB000EF780005F640038DB000DFDA000F1000765B000C3DA001EF000AF71400713B5001DE800E26D003A33001F140068F3801ADDF800ECC00773A60067ECA400F96005FF7E8801E5F44003F4800757E60700122142C6A1B0806C201B0886C324B0CC4C2E67787730A23063702A8A5240B56C263964AA0E7807190F231328968502C2C98F8E3E26A05E5019FFC7900004D2D9158A002483D49200000F9AFE0801AFFDFA4000065D48B468006FFE0802B9FEED600CBED1D74003D9FA10037FDA2000EEBB400F3B8000F29000BF139801CFF000057AC8017E2F1002BD00015D4800E8F6001CEEB40078F03FDE03A33001DF800EEB0003776E003DF000EE34800CFBE001DC000D0E7003CBD7000FCC002FD2F0C00EC7D0000FD1002FFBF10700124142C6E1B0806C323B0806C221B0CBDD4DB936C8DC8C332F04CC4A04A12ECE473989AC8AA098C668391C9316EB10530DA2EBB39F5AC621A015D22FE00000AED7FF631C8010FBBB84B000D2DFCA00032F005C00000023D4BD04803ABFE0801A9FC2C002BE65A00079DE6801BBC48015E899001E77800057C5E400F19C200357E98007C4C801C5DA006EF30017E10017EE73003C96003C4002FBBD1003A3B7001EA00069F30019FB6003E4800EEB4000F2F08007720057B8C800EC7D0000FCF001D479C008FB90007AA001E2F3838012E142C74440D0C834440C09D2AC326D996DC8C4AAEE49BBB6153103168AB492247FDFADAA9D06A744713AB3430F69D9A571B01D4E310396C14ED7EA1D3CC381C22112C470F7EEDA1BA2033D82DCACD7E6442033C03834001CBC6AE2113EFEAD25EE1D98C021A070678089BC0499804340E44F0110D0E52A0E0C45731AFA2F84F0CE059D4619EE3DE206018797816026BC5D4B9026B0FE2BCE8032C728B4085F5B385CE1626F538785CE1654BB2D3A89A49675353AA982CF9E6749B10E3ECDDC6EC15ADDC520B3EBDE22900C7C27553A10AEC9D24073E9D26C0EFDDC49251F55C6D120ECEDD52284B9FB7553AA05F5EAA74928FAB51369128FA63771B12E7ED8DDC6ECA879FA368A03BBAAA75530617FC2A755300EDECDE936943BBF1F8C8137DDF5E6405EBFF23602F5E9FC761C0012414212CE00A3942C1230A2AA01922E2CD8139C5A2B89344003C07DB2A7C555093015464576D7556FADCA6E6C0549998DB1A1C75328B654542F5558CCB6C99119900964D2977AAA491191168C35E5DBD7BF86368B23DF476EBCB563748C95ACDDDB78F6EB9E464AD71DD9E8EEB28C0D8871B78786ECF460AC4F4DDABAF7E9F0AC589CD30D796AC6DA9A1CE6EEE7B3B75E52528EB36ECF47939CF825C9DEF1E09AAA7AC94A9953E013C8F7A24F0F3DD27A1B35DA2FE45FD58F2ED17FD1BF6479A7C418625778891E09C9EC1894ABBD95826ECAEF3048B95DD2953249DCA8B4449DEE990618B7BA8818F2DF14448F157C4186252AEF78F04D5538C4A54CA9EB04EAB32CBE1AE791EF59B957B8C66C15739C524067DDF199C5A24A6ED5D76CB338B2617CFDBD7749893B25764D8739FB69890F8000003626D6F6F760000006C6D76686400000000E238B29EE238B29E00001F4000000BC00001000001000000000000000000000000010000000000000000000000000000000100000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002000001F47472616B0000005C746B686400000001E238B29EE238B29E000000010000000000000BC0000000000000000000000000010000000001000000000000000000000000000000010000000000000000000000000000400000000000000000000000000001906D646961000000206D64686400000000E238B29EE238B29E00001F400000200055C400000000003168646C720000000000000000736F756E000000000000000000000000436F7265204D6564696120417564696F00000001376D696E6600000010736D686400000000000000000000002464696E660000001C6472656600000000000000010000000C75726C2000000001000000FB7374626C00000067737473640000000000000001000000576D7034610000000000000001000000000000000000020010000000001F40000000000033657364730000000003808080220000000480808014401400180000003E8000003E800580808002158806808080010200000018737474730000000000000001000000080000040000000028737473630000000000000002000000010000000700000001000000020000000100000001000000347374737A00000000000000000000000800000004000000FC000000DA000000C4000000CC000000CF0000012F00000133000000187374636F00000000000000020000002C00000594000000FA75647461000000F26D657461000000000000002268646C7200000000000000006D6469720000000000000000000000000000000000C4696C7374000000BC2D2D2D2D0000001C6D65616E00000000636F6D2E6170706C652E6954756E6573000000146E616D65000000006954756E534D5042000000846461746100000001000000002030303030303030302030303030303834302030303030303330302030303030303030303030303031344330203030303030303030203030303030303030203030303030303030203030303030303030203030303030303030203030303030303030203030303030303030203030303030303030',
            '0000001C667479704D344120000000004D34412069736F6D6D703432000000016D64617400000000000006B900D0400701089FCC3F37F988D119244F136EB6DEF2D4FB2318F1A72BD82378E4A530880F43C1E1144882A915538B9449A404203EA71106289857C884CCEB71DFC1B70B2697F155D8FC6B947877ACF91DB3ADB9733772AD8E1D51C5780035FE8CC9E1EC4CF7820FA775D5461EDED235C03E6792BA97DAB7CF894B20F33D8B2F87F098EAB007EDE40FEBDEA9BD7516C70C6C27C245D48D5C15079BA58F71DFA57631E9B30F72A55EF7AF968B6558A798518731A345E37ECBA8EFA0BBE3F82C7BFCD39C0BDEBA176FA515EDE4A9F0478C8D7B792DA36E5B58D6C33D5FA12FAFC5ED63ABD21EDE43BDC6E4C4A21AE8ABDEB30435EE4F87012CD42C725A0CE0C2A63B9DB1C770518DAD8C951802F04CACCBAD2DF4A74E946A169F51FC938931E1865E38E3C9FD47870065971BD3BA5C600C71C2FA62A3410404FDEF571C40ACBE43B9C0178E3D0FDA32C806597DBFA5C7100D4F4340178FAE50032E6E8802F57C16400AF02005745B0018F2785200AE28015DE4001CFCA401972F18007519001BF4000CBA7001C4D2001CC001C304FFE981C7DB200BF80017EEE0007BFB64017E6003F0001DDA90063EDC801EBED003BBF4002F1FD7200CF0F6E0017F8C001ED002BDFC81C00128142C2C1B0A86C323B0C8EC33B766376029BA72E3B32D4502050908F3098B93B882A6AB517342C00055FBEDC0BF8500003FD8D800B60FA69C2C0009FD13E260003F63A0C0000BF39FE9700067FF47C1C00395FC100377E5F200BF139801CFF420065F8DC802FB7C400EF74800792001C7D80077BC0002FC7000E36C0037FA0002FB0002BB6C000AEF800770001DA640073B4400771001D06D0039DA6003B1001C5DA006B783001D9800ED730035FC1000F26005F8BD10039FC2001E4800747CC0700124142C6C1B0806C221B0886C324B0C91E86CF50332AD9A77918514025096663E17A538980F808964E1135A1A8528D070418E84940E707910717FF800000654D2B9158A003AA0AD86E01CA001F62FBF801AFFA3480000CBA51300004FF04015D5FFCECC015F89C2003CBED8017FC10007BDE7003D7A001EC20017F373003A7CC0057C9002FDDE20057B400576200397B000E8E0800F7E003AAD8007934C007B60057BAC000D6EFC007DF000EE34800D7EF800770003439C00F2F5C003E4000F4BC3003A7B4001EA400BFB788380012A142D241B0A06C3277A263B60866307319188A0A2F04BAA687C23469DE59411C0A3758891D0E842D69CB489045377C67508DED38E608200E38EC1DF0D6BC410A01C701124275E0870A377E1739FEEF1E00E3C0638B9FEC4E4F4E7C30C179DEEE67D52EB0061863F53EB308019EBFB146720BCF53E3B7201878D000777C2C002F2F162C02BB8480579760013EFE8013D4640063E6001EDC802F93B6001BBCC003C2CC00EE730038C001E2000ECF1003776E005FA08002760017E79003AD001D968001BF4800AF2800F2640074FA080057BF002B91CE003CD0007A2001C5D3070012E142870661B85854173AA0C8A131A85477314C29AECC2E82AF2842E968B34924911FF57A19E54A90991A72C677DA7A0F596AB0D2A697468C4ECBDAA2A4847092154AA5BA42D925AC2639492FABE8C7312B33441C377677D428C644233FEEF0EAA505C8CD31FFF899108A0C80F07E62FCB05525177E27B7B319A668B9EEBDFF2125A935F0790CD16A66F07AAC6D09AC6E3A8FF57073CA0067E799D5017F4F66EC05F5F86ED207BFE5BB89033F5F5A2407CFBA75BB0B75FF9E5AA402BA3A7548057BBEE3B0CBF55DA0FEF3B41F4DE20FE27107A776D01E15601AFA626006B970DD807F87B113F7B8223F269112F548897C2A8B7EAAA25F6D7597FED582C452F7DEC5826EFF876CA0259EEECA8838001101422E8F50B05377CE305158DD81A14544262D15C49A2001E03E7249C5AAC31691753655716AB0C49D0C5957F83FA73F16EA9D6D5264A4551915DB5B29F6B49325454962DB26C2BF16516CA9A93131B4B519DB5DEBEC81A862E56FDA6BB6342BA881A4E6E55DE876DA9996D448686CCA6ED72A5DEAA45E686CE08F8B29B8AD42F08ECA11B277A3E2DD371523A209D7342BB6B651E6A4FA245558CCCEC9B0E3A980A45EA52EB36DA5A8B6A9C9DEF1E09AAA71897FFA992561EFE93F4BF911279BEB3F7BFCD125A5FDAFD87EAD5970FE4FE45FD58F2ED17FD1BF6479AB4CFD5B926FAD3A2FD97C3344E4E8BE89F2DD1355EC19F9DE6A65EC3DF59E468B3B12FF59F81E86CDD2FED78CE86CDC2791FE6894CF7749FF46D4933DDD25FD5B56257C517ECB8F04BB83724FCE9553920CD1216A7BC7B5CD553BA52A65974E715A9CE28337B8C66C033F3F3A2436B6AC794BE1DD64CE2C52537498DB54C42C8F7D18533C94C39F0000003626D6F6F760000006C6D76686400000000E238B29EE238B29E00001F4000000BC00001000001000000000000000000000000010000000000000000000000000000000100000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002000001F47472616B0000005C746B686400000001E238B29EE238B29E000000010000000000000BC0000000000000000000000000010000000001000000000000000000000000000000010000000000000000000000000000400000000000000000000000000001906D646961000000206D64686400000000E238B29EE238B29E00001F400000200055C400000000003168646C720000000000000000736F756E000000000000000000000000436F7265204D6564696120417564696F00000001376D696E6600000010736D686400000000000000000000002464696E660000001C6472656600000000000000010000000C75726C2000000001000000FB7374626C00000067737473640000000000000001000000576D7034610000000000000001000000000000000000020010000000001F40000000000033657364730000000003808080220000000480808014401400180000003E8000003E800580808002158806808080010200000018737474730000000000000001000000080000040000000028737473630000000000000002000000010000000700000001000000020000000100000001000000347374737A00000000000000000000000800000004000000F1000000CE000000C3000000CE000000E10000010F00000165000000187374636F00000000000000020000002C00000570000000FA75647461000000F26D657461000000000000002268646C7200000000000000006D6469720000000000000000000000000000000000C4696C7374000000BC2D2D2D2D0000001C6D65616E00000000636F6D2E6170706C652E6954756E6573000000146E616D65000000006954756E534D5042000000846461746100000001000000002030303030303030302030303030303834302030303030303330302030303030303030303030303031344330203030303030303030203030303030303030203030303030303030203030303030303030203030303030303030203030303030303030203030303030303030203030303030303030'
        ];
        let decoded = chunks.map(f => ({ ext: '.m4a', source: Buffer.from(f, 'hex') }));
        await combine(decoded, output);
        console.warn(output);
        let dur = await metadata(output);
        console.warn(dur);
    });
});