import React from "react";

function Search({ search, setSearch, handleSearch }) {
	return (
		<div className="search-container">
			<input
				className="place-search"
				type="text"
				name="place-name"
				placeholder="Enter the name of the place"
				value={search}
				onChange={(event) => setSearch(event.target.value)}
			/>
			<button className="search-btn" onClick={handleSearch}>
				Search
			</button>
		</div>
	);
}

export default Search;
