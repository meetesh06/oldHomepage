const fs = require('fs');

const getProcessed = (s) => {
  return s.substring(4,s.length-3).trim()
}

let idx = 0

const postsPath = __dirname + "/posts";

const categoriesDirs = fs.readdirSync(postsPath, {withFileTypes: true})

const directoriesInDIrectory = categoriesDirs
    .filter((item) => item.isDirectory())
    .map((item) => item.name);


const res = {}
res["categories"] = new Set()
res["posts"] = []
res["secrets"] = []

directoriesInDIrectory.forEach((currCat) => {
  const categoryPosts = fs.readdirSync(postsPath + "/" + currCat, { withFileTypes: true });
  
  const postsInCategory = categoryPosts
        .filter((item) => !item.isDirectory())
        .map((item) => item.name);

  postsInCategory.forEach((currPostPath) => {
    const postFile = fs.readFileSync(postsPath + "/" + currCat + "/" + currPostPath)
    const postData = postFile.toString().split("\n")
    const title = getProcessed(postData[0])
    const category = getProcessed(postData[1])
    const lineage = getProcessed(postData[2])
    const description = getProcessed(postData[3])
    const created = getProcessed(postData[4])

    postData.splice(0,5);
    const currPost = {
      "id": idx++,
      category,
      lineage,
      title,
      description,
      created,
      link: currCat + "/" + currPostPath,
      postText: postData.join('\n').toString(),
      backup: ""
    }

    res["categories"].add(category)
    res["posts"].push(currPost)
  })

})

res["categories"] = [...res["categories"]]

console.log(`Generated ${res.posts.length} posts, ${res.categories.length} categories`);

fs.writeFile("blogPostsData.json", JSON.stringify(res), function(err) {
  if (err) {
    console.log(err);
  }
});