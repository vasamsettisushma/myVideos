import './index.css'

const EmptySavedListView = () => (
  <div className="h-100 d-flex justify-content-center align-items-center w-100">
    <div className="text-center">
      <div className="">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
          className="noSaved"
        />
      </div>
      <h1 className="h4 text-secondary mt-3">No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  </div>
)

export default EmptySavedListView
