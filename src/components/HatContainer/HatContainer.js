import React from 'react';
import Hat from '../Hat/Hat';
import './HatContainer.css';
import SortMenu from '../SortMenu/SortMenu';
import Modal from 'react-responsive-modal';



class HatContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			sortingMethod: '-',
			numberOfHats: 10,
			delay: 0,
			hatArray: [],
			sorting: false,
			sorted: false,
			startTime: undefined,
			endTime: undefined,
			turboMode: false,
			hatSize: 100,
			errorMessage: "",
			warning: undefined,
		};

	}

	globalHatArray = [];
	heapArrayLength = undefined;

	sleep = (ms = this.state.delay) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	callbackSleep(callBack, ms = this.state.delay) {
		return new Promise(resolve => {
			setTimeout(() => {
				callBack();
				resolve();
			}, ms);
		});
	}

	async bubbleSort() {
		let list = this.state.hatArray;
		let len = list.length;
		let swapped;
	    do {
	        swapped = false
	        for (let i = 1; i < len; i++) {
	            if (list[i - 1].props.number > list[i].props.number){
	                let temp = list[i - 1];
	                list[i - 1] = list[i];
	                list[i] = temp;
	                swapped = true;
	            }
	            if(!this.state.sorting) {
					return;
				}
				this.setState({hatArray: list});
	            await this.sleep();
	        }
	        len--;
	    } while (swapped)
	    this.setState({
	    	sorted: true,
	    	endTime: new Date().getTime(),
	    	sorting: false,
	    });
	}
	bubbleSortTurbo() {
		let list = this.state.hatArray;
		let len = list.length;
		let swapped;
	    do {
	        swapped = false
	        for (let i = 1; i < len; i++) {
	            if (list[i - 1].props.number > list[i].props.number){
	                let temp = list[i - 1];
	                list[i - 1] = list[i];
	                list[i] = temp;
	                swapped = true;
	            }
	            if(!this.state.sorting) {
					return;
				}
				this.setState({hatArray: list});
	        }
	        len--;
	    } while (swapped)
	    this.setState({
	    	sorted: true,
	    	endTime: new Date().getTime(),
	    	sorting: false,
	    });
	}

	async mergeWrap() {
		this.globalHatArray = this.state.hatArray;
		await this.mergeSort(0, this.globalHatArray.length - 1);
		if(!this.state.sorting) {
			return;
		}
		this.setState({
	    	sorted: true,
	    	endTime: new Date().getTime(),
	    	sorting: false,
	    });
	}


	async mergeSort(l, r) {
		if(l < r) {
			const m = Math.floor((l + r) / 2);
			await this.mergeSort(l, m);
			await this.mergeSort(m + 1, r);
			if(!this.state.sorting) {
				return;
			}
			await this.merge(l, m, r);	
		}
	}

	async merge(l, m, r) {
		let left = this.globalHatArray.slice(l, m + 1);
		let right = this.globalHatArray.slice(m + 1, r + 1);
		let ptr = l;
		if(!this.state.sorting) {
			return;
		}
		while(left.length && right.length) {
			if(left[0].props.number <= right[0].props.number) {
				this.globalHatArray[ptr] = left.shift();
			} else {
				this.globalHatArray[ptr] = right.shift();
			}
			await this.sleep();
			ptr++;
			this.setState({hatArray: this.globalHatArray});
		}

		while(left.length) {
			this.globalHatArray[ptr] = left.shift();
			ptr++;
			await this.sleep();
			this.setState({hatArray: this.globalHatArray});
		}

		while(right.length) {
			this.globalHatArray[ptr] = right.shift();
			ptr++;
			await this.sleep();
			this.setState({hatArray: this.globalHatArray});
		}
	}
	mergeWrapTurbo() {
		this.globalHatArray = this.state.hatArray;
		this.mergeSortTurbo(0, this.globalHatArray.length - 1);
		if(!this.state.sorting) {
			return;
		}
		this.setState({
	    	sorted: true,
	    	endTime: new Date().getTime(),
	    	sorting: false,
	    });
	}


	mergeSortTurbo(l, r) {
		if(l < r) {
			const m = Math.floor((l + r) / 2);
			this.mergeSortTurbo(l, m);
			this.mergeSortTurbo(m + 1, r);
			if(!this.state.sorting) {
				return;
			}
			this.mergeTurbo(l, m, r);	
		}
	}

	mergeTurbo(l, m, r) {
		let left = this.globalHatArray.slice(l, m + 1);
		let right = this.globalHatArray.slice(m + 1, r + 1);
		let ptr = l;
		if(!this.state.sorting) {
			return;
		}
		while(left.length && right.length) {
			if(left[0].props.number <= right[0].props.number) {
				this.globalHatArray[ptr] = left.shift();
			} else {
				this.globalHatArray[ptr] = right.shift();
			}
			ptr++;
			this.setState({hatArray: this.globalHatArray});
		}

		while(left.length) {
			this.globalHatArray[ptr] = left.shift();
			ptr++;
			this.setState({hatArray: this.globalHatArray});
		}

		while(right.length) {
			this.globalHatArray[ptr] = right.shift();
			ptr++;
			this.setState({hatArray: this.globalHatArray});
		}
	}

	async selectionSort() {
		let list = this.state.hatArray;
		for (let i = 0; i < list.length; i++) {
			let min = i;
			for (let j = i; j < list.length; j++) {
				if(list[j].props.number < list[min].props.number) {
					min = j;
				}
				if(!this.state.sorting) {
					return;
				}
				await this.sleep();
			}
			let temp = list[i];
			list[i] = list[min];
			list[min] = temp;
			this.setState({hatArray: list});
		}
		this.setState({
			sorted: true,
			endTime: new Date().getTime(),
			sorting: false,
		});
	}

	selectionSortTurbo() {
		let list = this.state.hatArray;
		for (let i = 0; i < list.length; i++) {
			let min = i;
			for (let j = i; j < list.length; j++) {
				if(list[j].props.number < list[min].props.number) {
					min = j;
				}
				if(!this.state.sorting) {
					return;
				}
			}
			let temp = list[i];
			list[i] = list[min];
			list[min] = temp;
			this.setState({hatArray: list});
		}
		this.setState({
			sorted: true,
			endTime: new Date().getTime(),
			sorting: false,
		});
	}

	async insertionSort() {
		let list = this.state.hatArray;
		for(let i = 1; i < list.length; i++) {
			for(let j = i; j > 0; j--) {
				if(list[j].props.number < list[j - 1].props.number) {
					let temp = list[j];
					list[j] = list[j - 1];
					list[j - 1] = temp;
				} else {
					break;
				}
				if(!this.state.sorting) {
					return;
				}
				this.setState({hatArray: list});
				await this.sleep();
			}
		}
		this.setState({
			sorted: true,
			endTime: new Date().getTime(),
			sorting: false,
		});
	
	}

	insertionSortTurbo() {
		let list = this.state.hatArray;
		for(let i = 1; i < list.length; i++) {
			for(let j = i; j > 0; j--) {
				if(list[j].props.number < list[j - 1].props.number) {
					let temp = list[j];
					list[j] = list[j - 1];
					list[j - 1] = temp;
				} else {
					break;
				}
				if(!this.state.sorting) {
					return;
				}
				this.setState({hatArray: list});
			}
		}
		this.setState({
			sorted: true,
			endTime: new Date().getTime(),
			sorting: false,
		});
	
	}


	async quickWrap() {
		this.globalHatArray = this.state.hatArray;
		await this.quickSort(0, this.globalHatArray.length - 1);
		if(!this.state.sorting) {
			return;
		}
		this.setState({
	    	sorted: true,
	    	endTime: new Date().getTime(),
	    	sorting: false,
	    });

	}

	async quickSort(lo, hi) {
		if(!this.state.sorting) {
			return;
		}
		if (lo < hi) {
			let p = await this.partition(lo, hi);
			await this.quickSort(lo, p - 1);
			await this.quickSort(p + 1, hi);
		}
	}

	async partition(lo, hi) {

		let pivot = this.globalHatArray[hi];
		let i = lo - 1;
		for(let j = lo; j < hi; j++) {
			if(this.globalHatArray[j].props.number < pivot.props.number) {
				i++;
				let temp = this.globalHatArray[j];
				this.globalHatArray[j] = this.globalHatArray[i];
				this.globalHatArray[i] = temp;
				this.setState({hatArray: this.globalHatArray});
			}
			if(!this.state.sorting) {
				return;
			}
			await this.sleep();
		}
		let temp = this.globalHatArray[i + 1];
		this.globalHatArray[i + 1] = this.globalHatArray[hi];
		this.globalHatArray[hi] = temp;
		this.setState({hatArray: this.globalHatArray});
		return i + 1;
	}

	quickWrapTurbo() {
		this.globalHatArray = this.state.hatArray;
		this.quickSortTurbo(0, this.globalHatArray.length - 1);
		if(!this.state.sorting) {
			return;
		}
		this.setState({
	    	sorted: true,
	    	endTime: new Date().getTime(),
	    	sorting: false,
	    });

	}

	quickSortTurbo(lo, hi) {
		if(!this.state.sorting) {
			return;
		}
		if (lo < hi) {
			let p = this.partitionTurbo(lo, hi);
			this.quickSortTurbo(lo, p - 1);
			this.quickSortTurbo(p + 1, hi);
		}
	}

	partitionTurbo(lo, hi) {
		let pivot = this.globalHatArray[hi];
		let i = lo - 1;
		for(let j = lo; j < hi; j++) {
			if(this.globalHatArray[j].props.number < pivot.props.number) {
				i++;
				let temp = this.globalHatArray[j];
				this.globalHatArray[j] = this.globalHatArray[i];
				this.globalHatArray[i] = temp;
				this.setState({hatArray: this.globalHatArray});
			}
			if(!this.state.sorting) {
				return;
			}
		}
		let temp = this.globalHatArray[i + 1];
		this.globalHatArray[i + 1] = this.globalHatArray[hi];
		this.globalHatArray[hi] = temp;
		this.setState({hatArray: this.globalHatArray});
		return i + 1;
	}

	heapifyTurbo(i) {
		let left = 2 * i + 1;
		let right = 2 * i + 2;
		let max = i;

		if(!this.state.sorting) {
			return;
		}

		if(left < this.heapArrayLength && this.globalHatArray[left].props.number > this.globalHatArray[max].props.number) {
			max = left;
		}

		if(right < this.heapArrayLength && this.globalHatArray[right].props.number > this.globalHatArray[max].props.number) {
			max = right;
		}

		if(max !== i) {
			let temp = this.globalHatArray[max];
			this.globalHatArray[max] = this.globalHatArray[i];
			this.globalHatArray[i] = temp;
			this.heapifyTurbo(max);
			this.setState({hatArray: this.globalHatArray});
		}
	}

	heapSortTurbo() {
		this.globalHatArray = this.state.hatArray;
		this.heapArrayLength = this.globalHatArray.length;

		for(let i = Math.floor(this.heapArrayLength / 2); i >= 0; i--) {
			this.heapifyTurbo(i);
		}

		for(let j = this.globalHatArray.length - 1; j > 0; j--) {
			let temp = this.globalHatArray[0];
			this.globalHatArray[0] = this.globalHatArray[j];
			this.globalHatArray[j] = temp;
			this.heapArrayLength--;
			this.heapifyTurbo(0);
			this.setState({hatArray: this.globalHatArray});
		}

		if(!this.state.sorting) {
			return;
		}
		this.setState({
	    	sorted: true,
	    	endTime: new Date().getTime(),
	    	sorting: false,
	    });
	}	

	async heapify(i) {
		let left = 2 * i + 1;
		let right = 2 * i + 2;
		let max = i;

		if(!this.state.sorting) {
			return;
		}

		if(left < this.heapArrayLength && this.globalHatArray[left].props.number > this.globalHatArray[max].props.number) {
			max = left;
		}

		if(right < this.heapArrayLength && this.globalHatArray[right].props.number > this.globalHatArray[max].props.number) {
			max = right;
		}

		await this.sleep();

		if(max !== i) {
			let temp = this.globalHatArray[max];
			this.globalHatArray[max] = this.globalHatArray[i];
			this.globalHatArray[i] = temp;
			this.setState({hatArray: this.globalHatArray});
			await this.heapify(max);
		}
	}

	async heapSort() {
		this.globalHatArray = this.state.hatArray;
		this.heapArrayLength = this.globalHatArray.length;

		for(let i = Math.floor(this.heapArrayLength / 2); i >= 0; i--) {
			await this.heapify(i);
		}

		for(let j = this.globalHatArray.length - 1; j > 0; j--) {
			let temp = this.globalHatArray[0];
			this.globalHatArray[0] = this.globalHatArray[j];
			this.globalHatArray[j] = temp;
			this.heapArrayLength--;
			await this.heapify(0);
			this.setState({hatArray: this.globalHatArray});
		}

		if(!this.state.sorting) {
			return;
		}
		this.setState({
	    	sorted: true,
	    	endTime: new Date().getTime(),
	    	sorting: false,
	    });
	}


	setDelay = (event) => {
		this.setState({delay: event.target.value});
	}

	setNumberOfHats = () => {
		if(this.state.numberOfHats > 10000) {
			this.setState({
				errorMessage: "Input exceeds the maximum allowed hats (10 000)"
			});
		} else {
			if(this.state.numberOfHats > 1000 && this.state.warning !== false) {
				this.setState({
					warning: true
				});
			}
			this.updateHatArray();
		}
	}

	updateHatArray = () => {
		let hatArray = [];
		for(let i = 0; i < this.state.numberOfHats; i++) {
			hatArray.push(
				<Hat width={this.state.hatSize} height={this.state.hatSize} number={Math.random()} />
			);
		}
		this.setState({hatArray: hatArray});
	}

	onHatInputChange = (event) => {
    	this.setState({
   		numberOfHats: event.target.value
    	});
	}

	onTurboModeChange = (event) => {
		this.setState({turboMode: event.target.checked});
	}

	onOptionSelect = (event) => {
		this.setState({sortingMethod: event.target.value});
	}

	onHatSizeChange = (value) => {
		this.setState({hatSize: value}, this.updateHatArray);
	}

	onSortBtn = () => {
		if(!this.state.sorting) {
			
			if(this.state.sortingMethod === '-') {
				return;
			}

			this.setState({
				sorting: true,
				startTime: new Date().getTime(),
			}, function() {
				if(this.state.turboMode) {
					switch(this.state.sortingMethod) {
						case 'Bubble Sort':
							this.bubbleSortTurbo();
							break;
						case 'Merge Sort':
							this.mergeWrapTurbo();
							break;
						case 'Selection Sort':
							this.selectionSortTurbo();
							break;
						case 'Insertion Sort':
							this.insertionSortTurbo();
							break;
						case 'Quick Sort':
							this.quickWrapTurbo();
							break;
						case 'Heap Sort':
							this.heapSortTurbo();
							break;
						default:
							break;
					}	
				} else {
					switch(this.state.sortingMethod) {
						case 'Bubble Sort':
							this.bubbleSort();
							break;
						case 'Merge Sort':
							this.mergeWrap();
							break;
						case 'Selection Sort':
							this.selectionSort();
							break;
						case 'Insertion Sort':
							this.insertionSort();
							break;
						case 'Quick Sort':
							this.quickWrap();
							break;
						case 'Heap Sort':
							this.heapSort();
							break;
						default:
							break;
					}
				}
			});
		} else {
			this.setState({sorting: false});
		}
	}

	onCloseModal = () => {
		this.setState({sorted: false});
	}

	onCloseError = () => {
		this.setState({errorMessage: ""});
	}

	onCloseWarning = () => {
		this.setState({warning: false});
	}

	render() {
		let {
			sorted, 
			hatArray, 
			sortingMethod, 
			startTime, 
			endTime, 
			numberOfHats, 
			sorting, 
			delay, 
			turboMode, 
			hatSize, 
			errorMessage, 
			warning,
		} = this.state;

		return (
			<div>
				<SortMenu 
					onOptionSelect={this.onOptionSelect} 
					onSortBtn={this.onSortBtn} 
					onHatInputChange={this.onHatInputChange}
					updateHatArray={this.setNumberOfHats}
					setDelay={this.setDelay}
					sorting={sorting}
					onTurboModeChange={this.onTurboModeChange}
					turboMode={turboMode}
					sortingMethod={sortingMethod}
					onHatSizeChange={this.onHatSizeChange}
					hatSize={hatSize} 
				/>
				<Modal 
					open={sorted} 
					onClose={this.onCloseModal} 
					classNames={{
						modal: 'custom-modal',
						closeIcon: 'modal-close-button'
					}}
					center 
				>
					<h1>Sorting Complete!</h1>
					<p>
						{
							turboMode 
							? `${sortingMethod} sorted ${numberOfHats} hats in ${(endTime - startTime) / 1000} seconds in Turbo Mode.`
							: `${sortingMethod} sorted ${numberOfHats} hats in ${(endTime - startTime) / 1000} seconds with a delay time of ${delay} milliseconds.`
						}
					</p>
				</Modal>
				<Modal
					open={warning}
					onClose={this.onCloseWarning}
					classNames={{
						modal: 'custom-modal',
						closeIcon: 'modal-close-button'
					}}
					center 
				>
					<h1>Warning</h1>
					<p>Trying to sort more than 1000 hats may crash your browser!</p>
				</Modal>				
				<Modal
					open={Boolean(errorMessage)}
					onClose={this.onCloseError}
					classNames={{
						modal: 'custom-modal',
						closeIcon: 'modal-close-button'
					}}
					center 
				>
					<h1>Error</h1>
					<p>{errorMessage}</p>
				</Modal>
				<div id="hat-box">
					{hatArray}
				</div>
			</div>
		);
	}

	componentDidMount() {
		let hatArray = [];
		for(let i = 0; i < this.state.numberOfHats; i++) {
			hatArray.push(
				<Hat width={this.state.hatSize} height={this.state.hatSize} number={Math.random()} />
			);
		}
		this.setState({hatArray: hatArray});
	}
}

export default HatContainer;