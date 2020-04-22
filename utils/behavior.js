module.exports = Behavior({
    // behaviors: [],
    // properties: {
    //   myBehaviorProperty: {
    //     type: String
    //   }
    // },
    data: {
      myBehaviorData: {}
    },
    // attached: function(){},


    onPageScroll(e){
        console.log(e,'behavior');
        
    },
    
    methods: {
     
    }
  })