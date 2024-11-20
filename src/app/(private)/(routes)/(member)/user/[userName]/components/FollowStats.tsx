const FollowStats = ({
  followers,
  followings,
  points
}: {
  followers: number
  followings: number
  points: number
}) => (
  <div className="flex justify-around text-center">
    <div>
      <p className="text-xl font-semibold">{followers}</p>
      <p className="text-gray-500">Followers</p>
    </div>
    <div>
      <p className="text-xl font-semibold">{followings}</p>
      <p className="text-gray-500">Following</p>
    </div>
    <div>
      <p className="text-xl font-semibold">{points}</p>
      <p className="text-gray-500">Points</p>
    </div>
  </div>
)

export default FollowStats
