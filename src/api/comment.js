import request from '@/request'


export function getCommentsByArticle(id) {
  return request({
    url: `/comments/article/${id}`,
    method: 'get'
  })
}

export function publishComment(comment) {
  comment.article = comment.article.id
  console.log(comment)
  if (comment.parent !== undefined) {
    comment.parent = comment.parent.id
    if (comment.toUser !== '') {
      comment.toUser = comment.toUser.id
    }
  }

  return request({
    url: '/comments/create/change',
    method: 'post',
    data: comment
  })
}
