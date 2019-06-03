const express                   =   require('express');
const router                    =   express.Router();
const PARAMS                    =   require('../config/globalparam');



const UserController 	        = require('../controllers/user.controller');
const BoardController 	        = require('../controllers/board.controller');
const StreamController 	        = require('../controllers/stream.controller');
const StateController 	        = require('../controllers/state.controller');
const CourseController 	        = require('../controllers/course.controller');
const ClassController 	        = require('../controllers/class.controller');
const CastCategoryController 	= require('../controllers/castcategory.controller');
const SubjectController 	    = require('../controllers/subject.controller');
const AlertController 	        = require('../controllers/alert.controller');
const BranchController 	        = require('../controllers/branch.controller');
const UniversityController 	    = require('../controllers/university.controller');
const CampusController 	        = require('../controllers/campus.controller');
const CampusCourseController 	= require('../controllers/campuscourse.controller');
const CampusCourseBranchController 	= require('../controllers/campuscoursebranch.controller');
const UnvHowToApplyController 	= require('../controllers/unvhowtoapply.controller');
const UnvEligibiltyCriController= require('../controllers/unveligibilitycriteria.controller');
const ExaminationPatternController= require('../controllers/examinationpattern.controller');
const ImportantaDatesController = require('../controllers/imporatantdates.controller');
const ImportantaLinksController = require('../controllers/imporatantlinks.controller');
const ExaminationCenterController = require('../controllers/examinationcenter.controller');
const UnversityAttachmentController = require('../controllers/universityattachment.controller');
const Religion                  = require('../controllers/religion.controller');
const FormSchedule              = require('../controllers/formschedule.controller');
const AboutUs                   = require('../controllers/aboutus.controller');
const TermCondition             = require('../controllers/termcondition.controller');
const FaqS                      = require('../controllers/faqs.controller');
const UnvCategory               = require('../controllers/unvcategory.controller');
const CourseCategoryController  = require('../controllers/coursecategory.controller');
const SchoolController          = require('../controllers/school.controller');
const SchoolDiscount            = require('../controllers/schoolDiscount.controller');
const CourseFor                 = require('../controllers/coursefor.controller');
const EntranceExam              = require('../controllers/entranceexam.controller');
const City                      = require('../controllers/city.controller');
const ItiTrade                  = require('../controllers/ititrade.controller');
const ItiCollege                = require('../controllers/iticollege.controller');
const ItiCollegeTrade           = require('../controllers/iticollegetrade.controller');
const WNCategory                = require('../controllers/whatsnextcatgory.controller');
const WhatsNext                 = require('../controllers/whatsnext.controller');
const CareerGlance              = require('../controllers/careerglance.controller');



const passport      	= require('passport');
const allowOnly         = require('../services/routes.helper').allowOnly;

require('./../middleware/passport')(passport);


/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({status:"success", message:"Admission Alert Pending API", data:{"version_number":"v1.0.0"}})
});


router.post(    '/users',                   UserController.create);                                                                                                         // C
router.post (    '/otp',                    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user, UserController.sendOtp));                    // R
router.post (    '/verifyotp',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user, UserController.verifyotp));                    // R
router.get (    '/users',                   passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, UserController.getAll));                    // R
router.get (    '/users/:id',               passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  UserController.getOne));                    // R
router.put (    '/users',                   passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  UserController.update));                    // U
router.delete(  '/users/:id',               passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, UserController.remove));                    // D
router.get(     '/userprofile',             passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  UserController.profile)); 
router.post(    '/users/profilepicture',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  UserController.profilepicture));                   // P

router.post(    '/users/login',              UserController.login);                     // Login

/**
 * @Board Controller Routing
 */
router.post(    '/boards',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, BoardController.create));                   // C
router.get(     '/boards',                  BoardController.getAll);                                                                                                        // R
router.put(     '/boards/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, BoardController.update));                   // U
router.delete(  '/boards/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, BoardController.remove));                   // D

/**
 * @Streams Controller Routing
 */
router.post(    '/streams',                 passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, StreamController.create));                  // C
router.get(     '/streams',                 StreamController.getAll);                  // R
router.put(     '/streams/:id',             passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, StreamController.update));                  // U
router.delete(  '/streams/:id',             passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, StreamController.remove));                  // D

/**
 * @State Controller Routing
 */
router.post(    '/states',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, StateController.create));                   // C
router.get(     '/states',                  StateController.getAll);                                                                                                        // R
router.put(     '/states/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, StateController.update));                   // U
router.delete(  '/states/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, StateController.remove));                   // D

/**
 * @City Controller Routing
 */
router.post(    '/cities',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, City.create));                   // C
router.get(     '/cities',                  City.getAll);                                                                                                        // R
router.get(     '/cities/:id',              City.getOne);                                                                                                        // R
router.put(     '/cities/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, City.update));                   // U
router.delete(  '/cities/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, City.remove));                   // D


/**
 * @Course Category Controller Routing
 */
router.post(    '/coursecategory',                 passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CourseCategoryController.create));                  // C
router.get(     '/coursecategory',                 passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CourseCategoryController.getAll));                  // R
router.put(     '/coursecategory/:id',             passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CourseCategoryController.update));                  // U
router.delete(  '/coursecategory/:id',             passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CourseCategoryController.remove));   //D        

/**
 * @Course Controller Routing
 */
router.post(    '/courses',                 passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CourseController.create));                  // C
router.get(     '/courses',                 CourseController.getAll);                  // R
router.get(     '/courses/:id',                 CourseController.getOne);                  // R
router.get(     '/coursesbyal/:id',                 CourseController.getCourseByAL);                  // R
router.put(     '/courses/:id',             passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CourseController.update));                  // U
router.delete(  '/courses/:id',             passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CourseController.remove));                  // D

/**
 * @Class Controller Routing
 */
router.post(    '/classes',                 passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, ClassController.create));                   // C
router.get(     '/classes',                 ClassController.getAll);                                                                                                        // R
router.put(     '/classes/:id',             passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, ClassController.update));                   // U
router.delete(  '/classes/:id',             passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, ClassController.remove));                   // D

/**
 * @Caste Category Controller Routing
 */
router.post(    '/castcategory',            passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CastCategoryController.create));            // C
router.get(     '/castcategory',            CastCategoryController.getAll);                                                                                                 // R
router.put(     '/castcategory/:id',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CastCategoryController.update));            // U
router.delete(  '/castcategory/:id',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CastCategoryController.remove));            // D

/**
 * @Subject  Controller Routing
 */
router.post(    '/subjects',                passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, SubjectController.create));                 // C
router.get(     '/subjects',                passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, SubjectController.getAll));                 // R
router.get(     '/subjects/:classid/:streamid',      SubjectController.get);                                                                                                // R
router.put(  '/subjects/:id',               passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, SubjectController.update));                 // U
router.delete(  '/subjects/:id',            passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, SubjectController.remove));                 // D

/**
 * @Alert  Controller Routing
 */
router.post(    '/alerts',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, AlertController.create));                   // C
router.get(    '/alerts',                 passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  AlertController.getAll));                 // R
//router.get(    '/alerts',                   passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  AlertController.getAlert));                 // R
router.get(    '/alerts/:alertid',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  AlertController.getAlertdetails)); // R
router.get(    '/searchalerts/:querystring',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  AlertController.searchAlert)); // R


/**
 * @Branch  Controller Routing
 */
router.post(    '/branches',                passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  BranchController.create));                // C
router.get(     '/branches',                passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  BranchController.getAll));                // R
router.get(     '/branches/:id',            passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  BranchController.get));                   // R
router.put(     '/branches/:id',            passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  BranchController.update));                // U
router.delete(  '/branches/:id',            passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  BranchController.remove));                // D

/**
 * @University  Controller Routing
 */
router.post(    '/universities',            passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  UniversityController.create));            // C
router.get(     '/universities',            passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  UniversityController.getAll));            // R
router.put(     '/universities/:id',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  UniversityController.update));            // U
router.delete(  '/universities/:id',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  UniversityController.remove));            // D

/**
 * @Campus  Controller Routing
 */
router.post(    '/campuses',                passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  CampusController.create));                 // C
router.get(     '/campuses',                passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  CampusController.getAll));                 // R
router.get(     '/campuses/:id',            passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  CampusController.get));                    // R
router.put(     '/campuses/:id',            passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  CampusController.update));                 // U
router.delete(  '/campuses/:id',            passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  CampusController.remove));                 // D

/**
 * @University-Campus-Course offered Controller Routing
 */
router.post(    '/campusescourses',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   CampusCourseController.create));            // C
router.get(     '/campusescourses',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   CampusCourseController.get));               // R
router.get(     '/campusescourses/:campusid',passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CampusCourseController.getOne));            // R
router.delete(  '/campusescourses/:id',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CampusCourseController.remove));           // D

/**
 * @University-Campus-Course-Branch offered Controller Routing
 */
router.post(    '/campusescoursebranches',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   CampusCourseBranchController.create));            // C
router.get(     '/campusescoursebranches',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   CampusCourseBranchController.get));               // R
router.get(     '/campusescoursebranches/:campusid/:courseid',passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CampusCourseBranchController.getOne));            // R
router.delete(  '/campusescoursebranches/:id',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, CampusCourseBranchController.remove));           // D


/**
 * @University-How-To-Apply  Controller Routing
 */
router.post(    '/unvhwtoapply',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    UnvHowToApplyController.create));           // C
router.get(     '/unvhwtoapply',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    UnvHowToApplyController.get));              // R
router.get(     '/unvhwtoapply/:campusid',passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    UnvHowToApplyController.getOne));           // R
router.put(     '/unvhwtoapply/:id',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    UnvHowToApplyController.update));           // U
router.delete(  '/unvhwtoapply/:id',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    UnvHowToApplyController.remove));           // D

/**
 * @University-Eligibility-Criteria  Controller Routing
 */
router.post(    '/unvelgcriteria',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    UnvEligibiltyCriController.create));       // C
router.get(     '/unvelgcriteria',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    UnvEligibiltyCriController.get));          // R
router.get(     '/unvelgcriteria/:campusid',passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    UnvEligibiltyCriController.getOne));       // R
router.put(     '/unvelgcriteria/:id',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    UnvEligibiltyCriController.update));       // U
router.delete(  '/unvelgcriteria/:id',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    UnvEligibiltyCriController.remove));       // D

/**
 * @University-Examination-Pattern  Controller Routing
 */
router.post('/examinationpattern',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    ExaminationPatternController.create));     // C
router.get( '/examinationpattern',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    ExaminationPatternController.get));        // R
router.get( '/examinationpattern/:campusid',passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    ExaminationPatternController.getOne));     // R
router.put( '/examinationpattern/:id',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    ExaminationPatternController.update));     // U
router.delete('/examinationpattern/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,    ExaminationPatternController.remove));     // D

/**
 * @University-Importants-Dates  Controller Routing
 */
router.post('/importantdates',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,       ImportantaDatesController.create));        // C
router.get( '/importantdates',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,       ImportantaDatesController.get));           // R
router.get( '/importantdates/:campusid',passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,       ImportantaDatesController.getOne));        // R
router.put( '/importantdates/:id',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,       ImportantaDatesController.update));        // U
router.delete('/importantdates/:id',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,     ImportantaDatesController.remove));        // D

/**
 * @University-Importants-Links  Controller Routing
 */
router.post('/importantlinks',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,       ImportantaLinksController.create));        // C
router.get( '/importantlinks',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,       ImportantaLinksController.get));           // R
router.get( '/importantlinks/:campusid',passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,       ImportantaLinksController.getOne));        // R
router.put( '/importantlinks/:id',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,       ImportantaLinksController.update));        // U
router.delete('/importantlinks/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,     ImportantaLinksController.remove));        // D

/**
 * @University-Examination-Centers  Controller Routing
 */
router.post('/examinationcenter',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,     ExaminationCenterController.create));      // C
router.get( '/examinationcenter',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,     ExaminationCenterController.get));         // R
router.get( '/examinationcenter/:campusid',passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,     ExaminationCenterController.getOne));      // R
router.put( '/examinationcenter/:id',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,     ExaminationCenterController.update));      // U
router.delete('/examinationcenter/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,     ExaminationCenterController.remove));      // D

/**
 * @University-Attachment  Controller Routing
 */
router.post('/unversityattachment',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   UnversityAttachmentController.create));      // C
router.get( '/unversityattachment',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   UnversityAttachmentController.get));         // R
router.get( '/unversityattachment/:campusid',passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   UnversityAttachmentController.getOne));      // R

/**
 * @Religion  Controller Routing
 */
router.post(   '/religion',             passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   Religion.create));                                // C
router.get(    '/religion',             Religion.getAll);                                                                                                                       // R
router.put(    '/religion/:id',         passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   Religion.update));                                // U
router.delete( '/religion/:id',         passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   Religion.remove));                                // D

/**
 * @FormSchedule Controller Routing
 */
router.post(   '/formschedule',         passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,   FormSchedule.create));                                // C
router.get(    '/formschedule/:date',   passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,   FormSchedule.getByDate));                                                                                                                       // R
router.delete( '/formschedule/:id',     passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,  FormSchedule.remove)); 

/**
 * @About Us Routing
 */
router.post(   '/aboutus',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   AboutUs.create));                                // C
router.get(    '/aboutus',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    AboutUs.get));                                                                                                                       // R
router.put(    '/aboutus/:id',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   AboutUs.update));
router.delete( '/aboutus/:id',          passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   AboutUs.remove)); 

/**
 * @Term & Condition Routing
 */
router.post(   '/termcondition',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   TermCondition.create));                                // C
router.get(    '/termcondition',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    TermCondition.get));                                                                                                                       // R
router.put(    '/termcondition/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   TermCondition.update));
router.delete( '/termcondition/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   TermCondition.remove)); 

/**
 * @FaQ's Routing
 */
router.post(   '/faqs',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   FaqS.create));                                // C
router.get(    '/faqs',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    FaqS.get));                                                                                                                       // R
router.put(    '/faqs/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   FaqS.update));
router.delete( '/faqs/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   FaqS.remove)); 

/**
 * @University Category Routing
 */
router.post(   '/unvcat',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   UnvCategory.create));                                // C
router.get(    '/unvcat',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    UnvCategory.getAll));                                                                                                                       // R
router.put(    '/unvcat/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   UnvCategory.update));
router.delete( '/unvcat/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   UnvCategory.remove)); 


/**
 * @School Routing
 */
router.post(   '/school',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   SchoolController.create));                                // C
router.get(    '/school',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    SchoolController.getAll));                                                                                                                       // R
router.put(    '/school/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   SchoolController.update));
router.delete( '/school/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   SchoolController.remove)); 

/**
 * @School Discount  Routing
 */
router.post(   '/schoolDiscount',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   SchoolDiscount.create));                                // C
router.get(    '/schoolDiscount',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    SchoolDiscount.getAll));                                                                                                                       // R
router.put(    '/schoolDiscount/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   SchoolDiscount.update));
router.delete( '/schoolDiscount/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   SchoolDiscount.remove)); 

/**
 * @Course For  Routing
 */
router.post(   '/coursefor',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   CourseFor.create));                                // C
router.get(    '/coursefor',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    CourseFor.getAll));                                                                                                                       // R
router.put(    '/coursefor/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   CourseFor.update));
router.delete( '/coursefor/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   CourseFor.remove));

/**
 * @Entrance Exam  Routing
 */
router.post(   '/entranceexam',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   EntranceExam.create));                                // C
router.get(    '/entranceexam',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    EntranceExam.getAll));                                                                                                                       // R
router.put(    '/entranceexam/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   EntranceExam.update));
router.delete( '/entranceexam/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   EntranceExam.remove)); 

/**
 * @Bulk email  Routing
 */
router.post(   '/entranceexam',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   EntranceExam.create));                                // C

/**
 * @ITI-Trade  Routing
 */
router.post(   '/ititrade',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   ItiTrade.create));                                // C
router.post(   '/importtrade',     passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   ItiTrade.importtrade));                                // C
router.get(    '/ititrade',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    ItiTrade.getAll));                                                                                                                       // R
router.put(    '/ititrade/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   ItiTrade.update));
router.delete( '/ititrade/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   ItiTrade.remove));


/**
 * @ITI-College  Routing
 */
router.post(   '/iticolleges',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   ItiCollege.create));                                // C
router.post(   '/importcollege',      passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   ItiCollege.importcollege));                                // C
router.get(    '/iticolleges',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    ItiCollege.getAll));                                                                                                                       // R
router.put(    '/iticolleges/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   ItiCollege.update));
router.delete( '/iticolleges/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   ItiCollege.remove));

/**
 * @ITI-College-Trade  Routing
 */
router.post(   '/iticollegestrade',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   ItiCollegeTrade.create));                                // C
router.get(    '/iticollegestrade',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    ItiCollegeTrade.getAll));                                                                                                                       // R
router.put(    '/iticollegestrade/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   ItiCollegeTrade.update));
router.delete( '/iticollegestrade/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   ItiCollegeTrade.remove));


/**
 * @Whats-Next-Category  Routing
 */
router.post(   '/wncategory',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   WNCategory.create));                                // C
router.get(    '/wncategory',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    WNCategory.getAll));                                                                                                                       // R
router.put(    '/wncategory/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   WNCategory.update));
router.delete( '/wncategory/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   WNCategory.remove));


/**
 * @Whats-Next-Category  Routing
 */
router.post(   '/whatsnext',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   WhatsNext.create));                                // C
router.get(    '/whatsnext',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    WhatsNext.getAll));                                                                                                                       // R
router.get(    '/whatsnext/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    WhatsNext.getOne));                                                                                                                       // R
router.delete( '/whatsnext/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   WhatsNext.remove));


/**
 * @Career-Glance  Routing
 */
router.post(   '/careerglance',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   CareerGlance.create));                                // C
router.get(    '/careerglance',        passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,    CareerGlance.getAll));                                            // R // R
router.delete( '/careerglance/:id',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin,   CareerGlance.remove));


module.exports = router;