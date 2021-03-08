import React from 'react';


const Image = (props) => {
    const {alt_description,urls:{thumb},index,fromModal} = props;
    let modalStyle = '';
    
    return <div className='row'>
        <div className='col-md-12 px-0'>
            <div className='rounded-lg overflow-hidden'>
                
                <img onClick={()=>props.toggleModal(index)} src={thumb} alt={alt_description} className={'img-fluid'}/>
            </div>
        </div>
    </div>
}

export default Image;