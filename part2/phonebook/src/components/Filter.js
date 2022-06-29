const Filter = (props) => {
  const handleSearch = (event) => {
    props.setSearchVal(event.target.value)
    if (props.searchVal === '') {
      props.setShowAll(true)
    }
    else {
      props.setShowAll(false)
    }
  }
  return (
    <>
      <p>filter shown with</p> <input onChange = {handleSearch} />
    </>
  )
}

export default Filter