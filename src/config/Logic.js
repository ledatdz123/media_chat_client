export const isPostLikedByUser=(post, userId)=>{
    for(let item of post.likeByUsers){
        if(item.user.userId===userId) return true
    }
    return false
}
export const isCommentLikedByUser=(comment, userId)=>{
    for(let item of comment.likeByUsers){
        if(item.user.userId===userId) return true
    }
    return false
}
export const isSavedPostByUser=(user, postId)=>{
    const save=user?.savedPosts || []
    for(let item of save){
        if(item.id===postId) return true
    }
    return false
}
export const isReqUser=(userId1, userId2)=>{
    if(userId1 && userId2) return userId1===userId2
}
export const isFollowing=(reqUser, user2)=>{
    if(reqUser && user2){
        for(let item of user2.followers){
            if(reqUser.id===item.id) return true
        }
    }
    return false
}
export const timeDifference=(timestamp)=>{
    const date=new Date(timestamp)
    const diff=Date.now()-date.getTime()
    const seconds=Math.floor(diff/1000)
    const minutes=Math.floor(seconds/60)
    const hours=Math.floor(minutes/60)
    const day=Math.floor(hours/60)
    const week=Math.floor(day/7)
    if(week>0){
        return week + ' week' + (week===1 ? '' : 's') + ' ago'
    }else if(day>0){
        return day + ' day' + (day===1 ? '' : 's') + ' ago'
    }else if(hours>0){
        return hours + ' hour' + (hours===1 ? '' : 's') + ' ago'
    }else if(minutes>0){
        return minutes + ' minute' + (minutes===1 ? '' : 's') + ' ago'
    }else if(seconds>0){
        return seconds + ' second' + (seconds===1 ? '' : 's') + ' ago'
    }
}
