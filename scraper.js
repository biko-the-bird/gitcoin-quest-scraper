var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

async function genSomeQuestNames() {
  return new Promise(resolve => {
    request("https://gitcoin.co/cpix18/quests", function(
      error,
      response,
      body
    ) {
      if (error) {
        console.log("Error: " + error);
      }

      console.log("request success");

      var titles = [];

      var $ = cheerio.load(body);
      $("h5.font-weight-semibold").each(function(index, e) {
        const title = e.children[0].data
          .toLowerCase()
          .replace("beat ", "")
          .replace(/\s+/g, "-")
          .replace("---", "-")
          .replace(",", "");

        titles.push(
          e.children[0].data
            .toLowerCase()
            .replace("beat ", "")
            .replace(/\s+/g, "-")
            .replace("---", "-")
            .replace(",", "")
        );
      });

      resolve(titles);
    });
  });
}

async function getQuestNames() {
  var names = genSomeQuestNames();
  console.log("awaiting");
  return await names;
}

function pingQuestsByTitle(titles) {
  const possibleIds = 100;
  for (var x = 0; x < possibleIds; x++) {
    titles.forEach(title => {
      /*   return new Promise(resolve => {
                request(`https://gitcoin.co/quests/${x}/${title}`, function(
                  error,
                  response,
                  body
                ) {
                  if (error) {
                    console.log("Error: " + error);
                  } */
    });
  }
}

//generate quest names from the #1 user profile
/* getQuestNames().then(titles => {
 
  console.log("titles 0", titles[0]);
}); */

async function pingQuest(id) {
  return new Promise(resolve => {
    request(`https://gitcoin.co/quests/${id}/`, function(
      error,
      response,
      body
    ) {
      if (error) {
        console.log("Error: " + error);
        resolve({ id, name: "😭😭Error page😭😭", value: 0 });
      } else {
        var $ = cheerio.load(body);

        if ($("h1#leaderboard").length > 0) {
          //this page is locked or otherwise not accessible
          console.log("locked page:", id);
          resolve({ id, name: "😭😭locked page😭😭", value: 0 });
        } else if (body.split('"value":')[1]) {
          const value = body
            .split('"value":')[1]
            .substring(0, 10)
            .split(",")[0];
          const name = body
            .split('"title":')[1]
            .substring(0, 100)
            .split(",")[0].trim();

          console.log(name);
          resolve({id, value,name});
        } else {
          console.log("otherwise broken", id);
          resolve({ id, name: "😭😭otherwise broken😭😭", value: 0 });
        }
        /*  if ($("script")[4].children[0]) {
            //this page seems to be a game we can pull a value from
            var value = $("script")[4]
              .children[0].data.split('"value"')[1]
              .split(",")[0]
              .replace(": ", "");
            var name = $("script")[4]
              .children[0].data.split('"title"')[1]
              .split('",')[0]
              .replace('"', "");
            //console.log('HEREH',name, 'HEREH');
            resolve({ id, name, value });
          } else {
            console.log("other error");
            resolve({ id, name: "other error", value: false });
          } */
      }
    });
  });
}

//test pages
//90 is a locked page
//10 is a good page


async function doPingQuest(id) {
  var quest = pingQuest(id);
  console.log("awaiting quest ping");
  return await quest;
}

async function guessQuests(howMany) {
    fs.appendFileSync(
        "quests.csv",
        `ID,VALUE,NAME\n`
      );
  for (var x = 0; x < howMany; x++) {
    doPingQuest(x).then(result => {
      fs.appendFileSync(
        "quests.csv",
        `${result.id},${result.value},"${result.name}"\n`
      );
    });
  }
}

guessQuests(200);
