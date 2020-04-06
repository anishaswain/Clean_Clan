/**
 * @param {{
 *  saveNewPost: (data: any) => Promise<any>
 *  updatePostData: (postID: string, data: any) => Promise<{id: string}>
 * }} PostDB - post db object
 */
module.exports = (PostDB) => ({
  /**
   * @function: create a new challenge
   * @param {object} data
   */
  createNewChallenge: async (data) => PostDB.saveNewPost({
    ...data,
    post_type: "Challenge"
  }),
  /**
   * @function: create a new solution
   * @param {object} data
   * @param {string} challengeID - challenge post id that this solution responds to
   */
  createNewSolution: async (data, challengeID) => {
    const solutionPost = await PostDB.saveNewPost({
      ...data,
      post_type: "Solution",
      challenge: challengeID
    });
    await PostDB.updatePostData(challengeID, {
      solution: solutionPost.id
    });
    return;
  }
});