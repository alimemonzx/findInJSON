const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/functions/findInJSON", (req, res) => {
  const { input } = req.body;
  res.json({ output: findInJson(input.object, input.key) });
});

app.get("/functions/findInJSON", (req, res) => {
  res.json({
    name: "findInJson",
    description: "Find any key in the deep JSON object",
    input: [
      {
        object: {
          type: "object",
          description: "Input the JSON object you want to search from",
          example:
            "{'name': 'Ali', 'email': 'ali@email.com', 'address': {'street': 'Altaf Hussain Road'}}",
        },
      },
      {
        key: {
          type: "string",
          description: "Input the key name you want to search in JSON object",
          example: "street",
        },
      },
    ],
    output: {
      type: "string",
      description: "Value of specified key",
      example: "Altaf Hussain Road",
    },
  });
});
function findInJson(object, keyToFind) {
  let toBeFound = null;
  function recursiveSearch(obj) {
    if (toBeFound !== null) {
      return;
    }
    if (Array.isArray(obj)) {
      obj.forEach((item) => recursiveSearch(item));
    } else if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        if (key === keyToFind) {
          toBeFound = obj[key];
          return;
        }
        if (typeof obj[key] === "object") {
          recursiveSearch(obj[key]);
        }
      }
    }
  }
  recursiveSearch(object);
  return toBeFound;
}

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
module.exports = app;
