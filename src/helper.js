const parsePostUrl = (id, title) => {
// return '/blog/'+id+'-'+title;
return '/blog/' + id;
}

const nonCachedRequest = (url) => {
return url+'?timestamp='+new Date().getTime();
// return url;
}

function sortPosts(a, b) {
return new Date(b.created).getTime() - new Date(a.created).getTime();
}

export { parsePostUrl, nonCachedRequest, sortPosts }