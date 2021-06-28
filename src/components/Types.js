import React from 'react';

const Types = (props) => {
    const { types } = props
    
    const showFormCheck = (types) => {
        let result = types.map((type,index) => {
            let id = type.replace(/ /g,'')
            return (
                <div className="form-check" key={index}>
                    <input className="form-check-input" type="checkbox" value="" id={id} />
                    <label className="form-check-label" htmlFor={id}>
                        {type}
                    </label>
                </div>
            )
        })
        return result
    }

    return (
        <section className="type-wrap">
            <div className="type-title">Refine by</div>
            <div className="types">
                <div className="head-title">Type</div>
                <div className="content">
                    <form>
                        {showFormCheck(types)}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Types;