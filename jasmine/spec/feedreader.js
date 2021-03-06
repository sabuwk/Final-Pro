/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*  Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty. (8)
         */

         it('has URL defined and URL is not empty', function() {
            
            //Iteriert durch das allFeeds Array
            for(i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /*  Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty. (9)
         */


         it('has a name defined and name is not empty', function() {
            
            //Iteriert durch das allFeeds Array
            for(i = 0; i < allFeeds.length; i++) {

                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /*  Write a new test suite named "The menu" (10)*/

    describe('The Menu', function() {

        /*  Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element. (11)
        */

         it('menu element is hidden by default', function() {
            
            // Checkt ob die Klasse menu-hidden da ist
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });



        /*  Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again. (12)
        */       

        it('menu changes visibility when clicked', function() {
            
            // Checkt ob das Menu auf False geht. Erst false, weil es am Anfang geschlossen ist.
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // Andersrum 
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });

    /*  Write a new test suite named "Initial Entries" (13) */ 

    describe('Initial Entries', function() {

                /*  Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function. (14)
         */

        // Stellt sicher, dass der Feed geladen ist
        beforeEach(function(done) {
            loadFeed(0, done);
        });


        it('at least a single .entry element within the .feed container', function(done) {
            /* OLD VERSION
            expect($('.feed').length).toBeGreaterThan(0);
            expect($('.entry').length).toBeGreaterThan(0);
            done();
            */
            
            // Erst wird es gestapelt in die myEntryTest Variable gespeiechert und dann geguckt, ob dieses länger ist als 0
            var myEntryTest = $('.feed .entry');
            expect(myEntryTest.length).toBeGreaterThan(0);


            done();

 
        });
    });

    /*  Write a new test suite named "New Feed Selection" (15)*/

    describe('New Feed Selection', function() {

        /*  Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous. (16)
         */

        var myFeed;

        // Stellt wieder sicher, dass der Feed geladen ist
        beforeEach(function (done) {

            loadFeed(0, function () {
            
                // Setzt die myFeed Variable 
                myFeed = $('.feed').html();

                // verhindert den Tiemout
                loadFeed(1, done);

            });
        });

        // die eigentliche Test-Methode
        it('content actually changes', function(done) {

            // guckt das der Feed nicht das gleiche ist wie myFeed das oben definiert wurde
            expect($('.feed').html()).not.toBe(myFeed);
            done();

        });


        // setzt alles wieder zurück
        afterAll(function(done) {
        
            loadFeed(0, done); 
        });

    });
   

}());
