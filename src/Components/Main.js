import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Masonry from 'react-masonry-css';
import Image from './Picture'
import Modal from 'react-modal'
import next from '../Images/next.svg';
import prev from '../Images/prev.svg'
import './Modal.css'
class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            images:[],
            numPage:0,
            isModelOpen:false,
            currClicked:0
        }
    }

    getImage = (number) => {
        console.log('called')
        fetch(`https://api.unsplash.com/photos?page=${number}&client_id=70CB6JDmkT5COr225vslra29EPggTyvpJBj8VjF5v_w`)
        .then(res => res.json())
        .then((res) => {
            console.log(res,'res');
            let newList = [...this.state.images,...res]
            console.log(newList)
            this.setState({
                images:newList,
                numPage:number+1
            })
        })
        .catch((err) => {
            console.log(err);
        }) 
    }
    componentDidMount(){
        this.getImage(this.state.numPage)
    }
    openModal = (index) => {
        this.setState({
            isModelOpen:true,
            currClicked:index
        })
    }
    closeModal = () => {
        this.setState({
            isModelOpen:false
        })
    }
    showNext = () => {
        if ((this.state.currClicked < this.state.images.length-1)){
            this.setState({
                currClicked:this.state.currClicked+1
            })
        }
    }
    showPrev = () => {
        if ((this.state.currClicked > 0 )){

            this.setState({
                currClicked:this.state.currClicked-1
            })
        }
    }
    render(){
        const breakPts = {
            default:6,
            1200:3,
            992:3,
            768:2,
            576:1,
        }
        return <div className='App'>
                {this.state.images.length > 0 ? <Modal isOpen={this.state.isModelOpen} onRequestClose={this.closeModal} style={{content:{
                    height:'fit-content',
                    width:'fit-content',
                    overflow:'hidden',
                    margin:'auto'
                },
                overlay:{

                }}}>
                   
                    <div className='modal-div'>
                        <div>
                        <img onClick={this.showPrev} src={prev} style={{height:'2rem',width:'2rem',marginRight:'1rem'}}/>
                        
                        
                        
                        </div>
                        <div className='modal-img-container'>
                        
                        
                        <img src={this.state.images[this.state.currClicked]["urls"]["small"]} className='modal-img'/>
                        </div>
                        <div>
                        <img onClick={this.showNext} src={next} style={{height:'2rem',width:'2rem'}}/>
                        </div>
                    
                    </div>
                    
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <button onClick={this.closeModal}>Close</button>
                    </div>
                    
                </Modal> : null}
                
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <InfiniteScroll pageStart={0} loadMore={()=>this.getImage(this.state.numPage+1)} hasMore={true}>
                                <Masonry breakpointCols={breakPts} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
                                    {
                                        this.state.images.map((image,index) => {
                                            return <Image index={index} toggleModal = {this.openModal} {...image} key={index.toString()+Date.now().toString()} />
                                        })
                                    }
                                </Masonry>
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            
            </div>
    }
}
export default Main;