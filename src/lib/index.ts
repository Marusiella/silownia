import puppeteer from "puppeteer";
import { kv } from "@vercel/kv";

export const getScreenshot = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const session = await kv.get("cookies");

  
  if (!session) {
    await page.goto(
      "https://www.google.com/maps/place/Warsztat+Formy/@50.0374107,20.2170571,17z/data=!3m1!4b1!4m6!3m5!1s0x4716478600b1b6d3:0xf908c031c31a707f!8m2!3d50.0374107!4d20.2192458!16s%2Fg%2F11ck3jrfd3?entry=ttu"
    );
    await page.waitForSelector(
      "#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.AIC7ge > div.CxJub > div.VtwTSb > form:nth-child(1) > div > div > button"
    );
    await page.click(
      "#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.AIC7ge > div.CxJub > div.VtwTSb > form:nth-child(1) > div > div > button"
    );
  } else {
    const cookies = JSON.parse(session as string);
    await page.setCookie(...cookies);
    await page.goto(
      "https://www.google.com/maps/place/Warsztat+Formy/@50.0374107,20.2170571,17z/data=!3m1!4b1!4m6!3m5!1s0x4716478600b1b6d3:0xf908c031c31a707f!8m2!3d50.0374107!4d20.2192458!16s%2Fg%2F11ck3jrfd3?entry=ttu"
    );
  }
  await page.waitForSelector(
    "#QA0Szd > div > div > div.w6VYqd > div > div > div > div > div > div > div:nth-child(4) > div:nth-child(1) > div > div"
  );

  //   await page.screenshot({ path: "example.png" });
  // const data = await page.$("#QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div.UmE4Qe > div.C7xf8b > div:nth-child(2) > div.g2BVhd.eoFzo > div")
  //   await data?.screenshot({ path: "example.png" });
  //   console.log("Screenshot taken");
  // const now = await page.$eval("#QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div.UmE4Qe > div.C7xf8b > div:nth-child(2) > div.g2BVhd.eoFzo > div > div.fMc7Ne.mQXJne", e => e.ariaLabel)
  // console.log(now)

  let x = await page.$$eval(
    "#QA0Szd > div > div > div.w6VYqd > div > div > div > div > div > div > div:nth-child(4) > div:nth-child(1) > div > div",
    (e) => e.map((e) => e.ariaLabel)
  );
  // console.log(txt)

  // save cache
  await kv.set("cookies", JSON.stringify(await page.cookies()));
  await browser.close();

  // const x = [
  //     'Ruch o 05:00: 0%.',
  //     'Ruch o 06:00: 9%.',
  //     'Ruch o 07:00: 20%.',
  //     'Ruch o 08:00: 27%.',
  //     'Ruch o 09:00: 26%.',
  //     'Ruch o 10:00: 18%.',
  //     'Ruch o 11:00: 8%.',
  //     'Ruch o 12:00: 1%.',
  //     'Ruch o 13:00: 0%.',
  //     'Ruch o 14:00: 7%.',
  //     'Ruch o 15:00: 20%.',
  //     'Ruch o 16:00: 39%.',
  //     'Ruch o 17:00: 56%.',
  //     'Ruch o 18:00: 63%.',
  //     'Ruch o 19:00: 56%.',
  //     'Obecny ruch: 100%, zwykle to 39%.',
  //     'Ruch o 21:00: 20%.',
  //     'Ruch o 22:00: 0%.'
  //   ]
  let now = -1;
  let y = x.map((e) => {
    if (e == null) return "";
    var m = e.split("00: ");
    if (m.length == 2) {
      return m[1].split("%")[0];
    }
    try {
      now = Number(e.split("Obecny ruch: ")[1].split("%")[0]);
      return e.split("zwykle to ")[1].split("%")[0];
    } catch {
      return "";
    }
  });
  // remove first and last element
  y.shift();
  y.pop();
  const z = y.map((e) => Number(e));
  return { now, z };
};
