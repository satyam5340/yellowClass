import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Masonry from 'react-masonry-css';
import Image from './Picture'
import Modal from 'react-modal'
import next from '../Images/next.svg';
import prev from '../Images/prev.svg'
import './Modal.css'
import './Picture.css'
Modal.setAppElement('#root');
class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            images:[],
            numPage:0,
            isModelOpen:false,
            currClicked:1,
            prevImg:0,
            nextImg:2,
            mostRecentClicked:'curr'
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
            currClicked:index,
            mostRecentClicked:'curr'
        })
    }
    closeModal = () => {
        this.setState({
            isModelOpen:false
        })
    }
    showNext = () => {
        if (this.state.currClicked == this.state.images.length - 1){
            this.setState({
                prevImg:this.state.currClicked,
                currClicked:0,
                nextImg:1,
                mostRecentClicked:'next'
            })
        }
        else if ((this.state.currClicked == this.state.images.length-2)){

            this.setState({
                prevImg:this.state.currClicked,
                currClicked:this.state.currClicked+1,
                nextImg:0,
                mostRecentClicked:'next'

                
            })
        }
        else{
            this.setState({
                prevImg:this.state.currClicked,
                currClicked:this.state.currClicked+1,
                nextImg:this.state.currClicked+2,
                mostRecentClicked:'next'
            })
        }
    }
    showPrev = () => {
        console.log('clicked')
        if ((this.state.currClicked == 0 )){

            this.setState({
                prevImg:this.state.images.length-2,
                currClicked:this.state.images.length-1,
                nextImg:0,
                mostRecentClicked:'prev'
            })
        }else if(this.state.currClicked == 1 ){
            this.setState({
                prevImg:this.state.images.length-1,
                currClicked:0,
                nextImg:1,
                mostRecentClicked:'prev'
            })
        }else{
            this.setState({
                prevImg:this.state.currClicked-2,
                currClicked:this.state.currClicked-1,
                nextImg:this.state.currClicked,
                mostRecentClicked:'prev'
            })
        }
    }
    render(){
        console.log(this.state.prevImg,this.state.currClicked,this.state.nextImg,this.state.mostRecentClicked)
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
                    margin:'auto',
                    display:"flex"
                    
                 },
                overlay:{

                }}}>
                   
                    <div className='modal-div'>
                        <div>
                        <img onClick={this.showPrev} src={prev} style={{height:'2rem',width:'2rem',marginRight:'1rem'}}/>
                        
                        
                        
                        </div>
                        <div className='modal-img-container'>
                        <div>
                            
                        <img src={this.state.images[this.state.prevImg]["urls"]["small"]} className={'prev' +(this.state.mostRecentClicked === 'prev' ? ' move' : '')}/>
                        </div>
                        <div>
                            
                        <img src={this.state.images[this.state.currClicked]["urls"]["small"]} className={'curr'+(this.state.mostRecentClicked === 'curr' ? ' move': '')}/>
                        </div>
                        <div>
                            
                        <img src={this.state.images[this.state.nextImg]["urls"]["small"]} className={'next'+(this.state.mostRecentClicked === 'next' ? ' move': '')}/>
                        </div>
                       
                        
                        
                        </div>
                        <div>
                        <img onClick={this.showNext} src={next} style={{height:'2rem',width:'2rem'}}/>
                        </div>
                    
                    </div>
                    
                    <div style={{display:'flex',justifyContent:'center'}}>
                    {/* <button onClick={this.closeModal}>Close</button> */}
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