import React from 'react';

const Pagination = (props) => {
    const { 
        numberPage,
        page,
        numberButton,
        getPage, 
    } = props

    let buttonStart = (page - Math.floor(numberButton / 2))
    let buttonEnd = (page + Math.floor(numberButton / 2))

    if (buttonStart < 1) { 
        buttonStart = 1
        buttonEnd = numberButton
    }

    if (buttonEnd > numberPage) { // 6 > 5
        buttonStart = numberPage - (numberButton - 1)
        if (buttonStart < 1) {
            buttonStart = 1
        }
        buttonEnd = numberPage
    }

    const handleClick = (page) => {
        getPage(page)
    }

    const handleClickPrevious = (page) => {
        let currentPage = page - 1 
        if (currentPage < 1) {
            currentPage = 1
        }
        getPage(currentPage)
    }

    const handleClickNext = (page) => {
        let currentPage = page + 1 
        if (currentPage > numberPage) {
            currentPage = numberPage
        }
        getPage(currentPage)
    }

    const showButton = (buttonStart, buttonEnd) => {
        const result = []
        // eslint-disable-next-line no-plusplus
        for (let i = buttonStart; i <= buttonEnd; i++) {
            result.push(
                <li 
                    className={page === i ? 'page-item px-2 active' : 'page-item px-2'}
                    key={i} 
                    onClick={() => handleClick(i)}
                >
                    {i}
                </li>,
            )
        }
        return result
    }

    return (
        <div className="pagination-wrap">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item px-2" onClick={() => handleClickPrevious(page)}>Previous</li>
                    { showButton(buttonStart, buttonEnd) }
                    <li className="page-item px-2" onClick={() =>  handleClickNext(page)}>Next</li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
