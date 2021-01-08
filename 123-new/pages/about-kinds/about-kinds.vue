<template name="about-kinds">
	<view class="container" v-if="sortArr.length > 0">
		<view class="content-list">
			<view class="content-title">我的收藏（{{ collectionArr.length }}）</view>
			<view class="content" id="my-collection">
				<!-- @touchmove="clear" -->
				<view
					class="content-item ignore-elements"
					:code="it.code"
					:id="it.code"
					@touchstart.prevent="start($event,index)"
					@touchend.prevent="end($event, it)"
					:key="index"
					v-for="(it, index) in collectionArr"
				>
					{{ it.name }} 
					<text style="display: none;" class="uni-panel-icon uni-icon close">&#xe404;</text>
				</view>
			</view>
		</view>
		<view class="content-list" v-for="(item, index) in sortArr" :key="'a' + index">
			<view class="content-title">
				{{ item.name }}
				<text @click="toBar(index)" class="uni-panel-icon uni-icon">&#xe583;</text>
			</view>
			<view class="content" :id="'item-parent_' + index">
				<!-- @touchmove="itemClear" -->
				<view
					class="content-item"
					:id="it.code+'-'+index"
					:code="it.code"
					@touchstart.prevent="itemStart"
					@touchend.prevent="itemEnd($event, it)"
					@click.prevent="toDestination(it)"
					:key="'b' + i"
					v-for="(it, i) in item.list"
				>
					{{ it.name }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'about-kinds',
	data() {
		return {
			showDelete:false,
			deleteID:null,
			sortArr: [],
			collectionArr: [],
			timeout: null,
			itemTimeout: null,
			sortableArr: []
		};
	},
	onLoad() {
		this.sortArr = uni.getStorageSync('sort');
		this.collectionArr = uni.getStorageSync('my-collection');
	},
	onReady() {
		let that = this;
		that.sortArr.forEach((v, i) => {
			let sortable = new Sortable(document.getElementById('item-parent_' + i), {
				group: {
					name: 'shared',
					pull: 'clone',
					put: false // 不允许拖拽进这个列表
				},
				animation: 150,
				sort: false, // 设为false，禁止sort
				onEnd: function(/**Event*/ evt) {
					sortable.options.disabled = true;
				}
			});
			that.sortableArr.push(sortable);
		});

		let coll = new Sortable(document.getElementById('my-collection'), {
			group: {
				name: 'shared',
				pull: false
				// put: false // 不允许拖拽进这个列表
			},
			filter: '.ignore-elements',
			animation: 150,
			sort: false,
			onSort: function(/**Event*/ evt) {},
			onEnd: function(/**Event*/ evt) {
				// coll.options.disabled = true;
			},
			// 元素从一个列表拖拽到另一个列表
			onAdd: function(/**Event*/ evt) {
				// same properties as onEnd
				var itemEl = evt.item; // dragged HTMLElement
				// evt.to;    // target list
				// evt.from;  // previous list
				// evt.oldIndex;  // element's old index within old parent
				// evt.newIndex;  // element's new index within new parent
				// evt.clone ;// the clone element
				// evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
				console.log('itemEl:' + itemEl);
				console.log('evt.to:' + evt.to);
				let code = evt.item.getAttribute('code');
				if ($(evt.to).find("uni-view[code='" + code + "']").length > 1) {
					evt.item.remove();
				}
			},
			store: {
				/**
				 * Get the order of elements. Called once during initialization.
				 * @param      {Sortable}  sortable
				 * @returns  {Array}
				 */
				get: function(sortable) {
					//    var order = localStorage.getItem(sortable.options.group.name);
					//      return order ? order.split('|') : [];
				},

				/**
				 * Save the order of elements. Called onEnd (when the item is dropped).
				 * @param  {Sortable}  sortable
				 */
				set: function(sortable) {
					let order = [];
					let children = $('#my-collection').children();
					for (let i = 0; i < children.length; i++) {
						order.push($(children[i]).attr('code'));
					}
					let tempArr = [];
					order.forEach(code => {
						let basicArr = uni.getStorageSync('basicArr');
						let data = basicArr.filter(item => {
							return item.code == code;
						});
						tempArr.push(data[0]);
					});
					uni.setStorageSync('my-collection', tempArr);
					$('#my-collection').find("uni-view[draggable='false']").remove();
					that.collectionArr = tempArr;
				}
			}
		});
	},
	methods: {
		start(e,index) {
			let that = this;
			if(that.showDelete){
				if(that.deleteID!=e.currentTarget.id){
					$(".close").hide();
					that.showDelete=false;
					that.deleteID = null;
				}else{
					let tempArr = uni.getStorageSync('my-collection');
					tempArr.splice(index,1);
					uni.setStorageSync('my-collection',tempArr);
					that.collectionArr = tempArr;
					$(".close").hide();
					that.showDelete=false;
					that.deleteID = null;
				}
			}else{
				that.timeout = setTimeout(() => {
					that.longPress(e);
				}, 1000);				
			}
		},
		longPress(e) {
			let that = this;
		    that.timeout = 0;
			that.showDelete = true;
			that.deleteID = e.target.id;
			$("#"+e.target.id).find("uni-text").show();
			setTimeout(()=>{
				that.deleteID = null;
				that.showDelete=false;
				$("#"+e.target.id).find("uni-text").hide();
			},3000);
		},
		end(e, it) {
			clearTimeout(this.timeout); //长按时间少于1000ms，不会执行传入的方法
			if (this.timeout != 0) {
				console.log('你这是点击，不是长按');
				this.toDestination(it);
			}
		},		
		clear(e) {
			clearTimeout(this.timeout);
		},
		itemStart(e) {
			let that = this;
			that.itemTimeout = setTimeout(() => {
				that.itemLongPress(e);
			}, 200);
		},
		itemLongPress(e) {
			this.itemTimeout = 0;
			let itemParent = this.sortableArr[Number(document.getElementById(e.target.id).parentNode.id.split('_')[1])];
			if (itemParent) {
				itemParent.options.disabled = false;
				itemParent._onTapStart(e);
			}
		},
		itemEnd(e, it) {
			clearTimeout(this.itemTimeout); //长按时间少于1000ms，不会执行传入的方法
			if (this.itemTimeout != 0) {
				this.toDestination(it);
			}
		},
		itemClear(e) {
			clearTimeout(this.itemTimeout);
		},
		toBar(index) {
			uni.navigateTo({
				url: '/pages/about-bar/about-bar?index=' + index
			});
		},
		toDestination(item) {
			const itemIndex = this.$api.getAboutItemIndex(item.code);
			if(itemIndex>0){
				if(itemIndex!=14){
					uni.navigateTo({
						url: '/pages/public/' + item.des + '/' + item.des + '?name=' + item.name + '&code=' + item.code + '&video_url=' + item.url + '&sortKey=' + item.sortKey
					});				
				}else{
					var url = item.des;
					if(url.indexOf("http") == -1){
						url = "//" + url;
					}
					if(item.code=='xglhc'){
						url = url + '/h';
					}else if(item.code == 'amlhc'){
						url = url + '/g';
					}
					window.open(url);
				}
			}
		}
	}
};
</script>

<style lang="scss">
.container {
	padding: 0 15px;
	.content-list {
		border-bottom: 1px solid #dfdfe5;
		padding-bottom: 3px;
		.content-title {
			font-size: 16px;
			height: 24px;
			line-height: 30px;
			margin: 7px 0;
		}
		.content {
			display: flex;
			flex-wrap: wrap;
			.content-item {
				height: 40px;
				line-height: 40px;
				border: 1px solid #dfdfe5;
				background: #fff;
				text-align: center;
				border-radius: 5px;
				width: 208rpx;
				margin: 4px;
				font-size: 26rpx;
			}
		}
	}
}
.uni-icon {
	float: right;
	line-height: 30px;
	color: #c2c2c2;
}
.close{
	position: absolute;
	top: -24rpx;
	right: -24rpx;
	z-index: 2;
}
</style>
