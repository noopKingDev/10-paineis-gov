import prompt from "prompt-sync";

import sisregiii from "../checkers/sisregiii.js";
import sigmaMa from "../checkers/sigma-ma.js";
import sispEs from "../checkers/sisp-es.js";
import pmSe from "../checkers/pm-se.js";
import siPni from "../checkers/si-pni.js";
import sgcRs from "../checkers/sgc-rs.js";
import sccMg from "../checkers/scc-mg.js";
import serebrumSe from "../checkers/serebrum-se.js";
import sispMa from "../checkers/sispMa.js";
import cbmRs from "../checkers/cbm-rs.js";

export default {
        headers : {
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
            "sec-ch-ua":
              '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
    },

    checkers: [
        {
          url: "sisregiii.saude.gov.br",
          checker: sisregiii,
          name: "sisreg III",
          online : true
        },
        {
          url: "sigma.policiacivil.ma.gov.br",
          checker: sigmaMa,
          name: "Sigma Ma",
          online : true
        },
        {
          url: "si-pni.saude.gov.br",
          checker: siPni,
          name: "Si-pni",
          online : true
        },
        {
          url: "portal.sisp.es.gov.br",
          checker: sispEs,
          name: "Sisp Es",
          online : true
        },
        {
          url: "intranet.pm.se.gov.br",
          checker: pmSe,
          name: "Pm Se",
          online : false
        },
        
        {
          url: "sgc.bm.rs.gov.br",
          checker: sgcRs,
          name: "Sgc Rs",
          online : false
        },
        {
          url: "ssc.prodemge.gov.br",
          checker: sccMg,
          name: "scc Mg",
          online : true
        },
        {
          url: "spi.sspds.ce.gov.br",
          checker: serebrumSe,
          name: "serebrum Ce",
          online : true
        },
        {
          url: "siisp.ma.gov.br",
          checker: sispMa,
          name: "sisp Ma",
          online : true
        },
        {
          url: "intranet.cbm.rs.gov.br",
          checker: cbmRs,
          name: "cbm Rs",
          online : true
        },
        
      ]
}