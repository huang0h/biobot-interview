function ResultBox({ data }) {
  return (
    <div className="result-box">
      {data === null
        ? (
          <p>
            No data loaded. Enter a kit label and click search to find its tracking number.
          </p>
        ) : (
          <>
            <p>Label ID: {data.label_id}</p>
            <br />
            <p>Tracking Number: {data.shipping_tracking_code}</p>
          </>
        )
      }
    </div>
  )
}

export default ResultBox
