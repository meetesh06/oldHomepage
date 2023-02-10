const fs = require('fs');

const getProcessed = (s) => {
  return s.substring(4,s.length-3).trim()
}

let idx = 0

const categoriesDirs = fs.readdirSync(__dirname, {withFileTypes: true})

const directoriesInDIrectory = categoriesDirs
    .filter((item) => item.isDirectory())
    .map((item) => item.name);


console.log(directoriesInDIrectory)
const res = {}
res["categories"] = new Set()
res["posts"] = []
res["secrets"] = []

directoriesInDIrectory.forEach((currCat) => {
  console.log(currCat)
  const categoryPosts = fs.readdirSync(__dirname + "/" + currCat, { withFileTypes: true });
  console.log(categoryPosts)
  
  const postsInCategory = categoryPosts
        .filter((item) => !item.isDirectory())
        .map((item) => item.name);

  postsInCategory.forEach((currPostPath) => {
    const postFile = fs.readFileSync(__dirname + "/" + currCat + "/" + currPostPath)
    const postData = postFile.toString().split("\n")
    const title = getProcessed(postData[0])
    const category = getProcessed(postData[1])
    const lineage = getProcessed(postData[2])
    const description = getProcessed(postData[3])
    const created = getProcessed(postData[4])

    const currPost = {
      "id": idx++,
      category,
      lineage,
      title,
      description,
      created,
      link: currCat + "/" + currPostPath,
      backup: ""
    }

    res["categories"].add(category)
    res["posts"].push(currPost)
  })

})

res["categories"] = [...res["categories"]]

console.log(res);

fs.writeFile("posts.json", JSON.stringify(res), function(err) {
  if (err) {
    console.log(err);
  }
});