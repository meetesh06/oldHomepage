const parsePostUrl = (id, title) => {
  return '/post-'+id+'-'+title;
}

const nonCachedRequest = (url) => {
  return url+'?timestamp='+new Date().getTime();
  // return url;
}

function sortPosts(a, b) {
  return new Date(b.created).getTime() - new Date(a.created).getTime();
}

export { parsePostUrl, nonCachedRequest, sortPosts }
