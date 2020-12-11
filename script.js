const container = document.getElementById('container');
const selectElements = document.querySelectorAll('.select-element');
const categories = document.querySelectorAll('.category');
const catTitle = document.querySelectorAll('.cat-title');
const selectElementCats = document.querySelectorAll('.select-element-cat');
const selectToolCats = document.querySelectorAll('.select-tool-cat');
const selectTools = document.querySelectorAll('.select-tool');
const legend = document.getElementById('legend');
const description = document.getElementById('description');
const instruction = document.getElementById('instruction');
const instCloseBtn = document.getElementById('inst-close-btn');
const instructionBtn = document.getElementById('instruction-btn');
const explanationBox = document.getElementById('explanation');
const explanationContent = document.getElementById('explanation-content');
const explBtn = document.getElementById('expl-btn');
const toolCloseBtn = document.getElementById('tool-close-btn');
const implementation = document.getElementById('implementation');
const impleContent = document.getElementById('implementation-content');
const impleCloseBtn = document.getElementById('imple-close-btn');

const graph = document.getElementById('graph');
const ctx = graph.getContext("2d");

const clicking = new Audio('media/clicking.mp3');

let currentToolIndex;

const explanations = [
  `Identify: A performance gap is a disparity between what an employee produces or delivers compared with what the manager, customer, or organization desires. This step requires you to identify the "desired" state (what you wanted) versus the actual or "current" state (what you have). An "opportunity gap" occurs when a leader sets goals that are too low for the skill and ability level of an employee, leaving his or her talents underutilized. To identify a gap, ask: "Does a disparity exist between what is expected or desired and what the employee delivers?"
  <br><br>
  After you have identified the gap in performance, you need to analyze what caused it by asking a series of questions.
  `,
  `System: Some performance problems are caused by external organizational systems not associated with an employee and, therefore, not subject to a motivational intervention. Do employees have the right tools or equipment to do the work effectively?`,
  `Internal: Is the problem caused by an employee's actions, that is, something internal? For employees to perform highly, they must have the ability to do the work and the ability to apply effort to the work. Is this problem due to ability (what employees can do) or effort (what employees are willing to do)?`,
  `Ability: Ability is the internal capability to do work or achieve goals. What kind of ability or other characteristic does the employee lack? Is it human capital, social capital, or base capital?`,
  `Effort: Effort is the amount of energy employees are willing to expend to deliver expected results. • Is the employee's effort too small because the rewards don't meet the employee's needs or because of the employee's perceptions of the equity of rewards?<br><br>
  Does the employee have the expectation that effort will lead to the desired level of performance or the expectation that the desired performance will lead to rewarding outcomes?
  `,
  `Human Capital: Does the employee lack the appropriate skills and knowledge needed to achieve expected outcomes?`,
  `Social Capital: Does the employee lack the appropriate relationships with other people (networks) and presentation of himself or herself to others (demeanor) to deliver expected results?`,
  `Base Capital: Certain characteristics that allow people to develop social skills, relationships, or attain knowledge are inborn or developed early in life. Does the employee lack the appropriate values, cognitive styles, and aptitudes to deliver expected results?`,
  `Needs: Do employees' rewards meet their basic motivational needs? Are the employees' needs mostly extrinsic or intrinsic?`,
  `Equity: If employees don't perceive that they are receiving fair rewards for their efforts compared with others, they will reduce their efforts. Do employees think they are being treated fairly compared with others?`,
  `E ➜ P Expectancy: If employees think that expending energy is unlikely to produce work that is considered successful, they will reduce their efforts. Do employees believe their efforts are likely to lead to the level of performance that is expected by their manager?`,
  `P ➜ O Expectancy: If employees think that doing successful work won't be seen and rewarded with money, promotion, or praise, or that doing the work itself won't be rewarding, they will reduce their efforts. Do employees think their performance is likely to lead to rewarding outcomes?`,
  `Intrinsic: Intrinsic needs are related to doing the work itself. These include interest in the work itself, opportunities to learn, grow, achieve goals, and fulfill one's potential. If the work itself does not provide these rewards, employees with these needs won't be motivated. Is the employee intrinsically motivated?`,
  `Extrinsic: Extrinsic needs are related to the environment or to management behavior rather than to doing the work itself. These include opportunities to earn money, recognition, and praise. If the environment does not provide these rewards, employees with these needs won't be motivated. Is the employee extrinsically motivated?`,
]

const toolDescriptions = [
  [`
  System Tools: Change Systems
  <br><br>
  If problems arise from factors outside an employee's control, apply "system tools" to resolve the problem. These involve changing the organizational systems and environment by techniques such as
  <ul>
    <li>providing resources (tools or equipment) to employees</li>
    <li>designing systems to get information to those who need it</li>
    <li>changing the way jobs, the flow of work, or work processes are designed</li>
    <li>changing the structure of the organization, such as creating new reporting, structures and organizational charts</li>
  </ul>
  Implementing these kinds of tools is beyond the scope of this course. Courses or books about organizational behavior and organizational change explain these concepts.
  `, ``],
  [`
  Human Capital Tools: Train and Develop
  <br><br>
  Training and development include any number of structured learning opportunities such as
  <ul>
    <li>classes and courses (online or face-to-face)</li>
    <li>lectures, seminars, and conferences</li>
    <li>books</li>
    <li>job rotations</li>
  </ul>
  Less-structured, experiential learning opportunities include,
  <ul>
    <li>Informal job-sharing</li>
    <li>Informal on-the-job training</li>
  </ul> 
  `, `
  Human Capital Tools: Train and Develop
  <br><br>
  Do It: Use this tool to increase or improve a skill or knowledge deficiency. Send the employee to training or development courses, provide other resources, or provide unstructured, experiential learning opportunities. Use this approach when the skills or knowledge can be learned in a short time, are unlikely to be resisted by the employee, and don't involve changing long-term beliefs or characteristics.
  <br><br>
  Don't Do It: Don't use this technique if
  <ul>
    <li>the employee doesn't have a knowledge or skill deficiency</li>
    <li>the source of the problem is external</li>
    <li>the employee resists training</li>
    <li>the training will take longer than a few months</li>
  </ul>
  Learn to Do It: Analyze which specific knowledge or skills are lacking, then work with your company's human resources department to discover what training options are available. Learn to analyze skill and knowledge problems and train the employee only on skills or knowledge that are truly lacking.
  <br><br>
  Delegate It: Have someone else implement this tool when you don't know what training is available, when you don't have access to knowledgeable trainers, or when you have a sizable human resources department with knowledgeable people to do this for you.
  `],
  [`
  Human Capital Tools: Mentor and Apprentice<br><br>
  Mentoring is a process in which a less-experienced person is paired with an expert in a particular field. Mentors meet periodically with their protégés and provide performance feedback and coaching, effective mentors are able to build honest and productive relationships with others. Apprenticeships are structured learning experiences, lasting for a set time, in which a person learns though practical experience under the guidance of a skilled expert. In an apprenticeship, employees spend some time away from regular duties to work with experts.
  `, `
  Human Capital Tools: Mentor and Apprentice
  <br><br>
  Do It: Use this tool when you want the employee to learn in a practical setting from an expert. Tell other managers and the human resources department that you are available to be a mentor if you
  <ul>
    <li>have expertise in some area</li>
    <li>wish to share your wisdom</li>
    <li>have time to meet periodically</li>
    <li>are committed to helping others grow</li>
  </ul>
  Don't Do It: Don't act as a mentor if
  <ul>
    <li>you are not an expert in the area</li>
    <li>you don't effectively build honest, productive relationships with others</li>
  </ul>
  Also, don't offer an employee an apprenticeship if the employee cannot take time away from regular duties.<br><br>
  Learn to Do It: If you opt to mentor someone, learn about the person's skills, strengths, and deficiencies. Build on strengths and focus developmental activities on weak areas. Be honest, but tactful, and supportive as the employee learns. Mentoring is an effective, managerial technique that can improve your employee's performance.<br><br>
  Delegate It: Mentors are recognized experts and serve as trusted guides and advisers to less-experienced employees. If you are not an expert in the area in which an employee needs mentoring, assign your employee to someone who is. Also, have someone else act as a mentor if you do not want to develop these skills.
  `],
  [`
  Social Capital Tools: Mentor and Coach
  <br><br>
  Mentors tend to be experts and guides in a specific profession, whereas coaches come from a wide range of backgrounds. Mentors and coaches help employees build social capital and provide feedback on what the employees do to help or hinder building social capital.
  `, `
  Social Capital Tools: Mentor and Coach<br><br>
  Do It: When employees have not developed sufficient networks, or their demeanor prevents them from attaining goals, use these ways to mentor or coach them:
  <ul>
    <li>Meet on a regular basis with employees.</li>
    <li>Observe how the employees interact with others.</li>
    <li>Provide feedback on what the employees do well or poorly regarding building
    social capital.</li>
    <li>Introduce the employees to others in the organization.</li>
    <li>Sponsor the employees for projects, groups, task forces, or other opportunities to work with new people.</li>
  </ul>
  Don't Do It: You should not provide personal feedback on your employees' demeanor unless you have a trusting relationship with them. Don't sponsor or introduce them to others if they don't want to complete the new tasks or meet the people, if they don't have the ability to do the tasks, or if they don't have the interpersonal skills to make a good impression.<br><br>
  Learn to Do It: Take personal and professional development courses on the art of coaching. Observe coworkers who frequently mentor others and ask them to mentor you in the art of mentoring. If you don't know the expectations for demeanor in your organization, find out from a colleague and share the information with the employees.<br><br>
  Delegate It: Ask someone else to coach an employee if you prefer more socially distant relationships with employees. Ask a colleague with good networks to introduce the employee to key people in your organization. Also ask a colleague to assist if your demeanor is not viewed positively in the organization and you don't want to change it.
  `],
  [`
  Social Capital Tools: Incentives
  <br><br>
  Both demeanor and networking behavior are long-term habits that are difficult to change, so long-term strategies are necessary. Managers can provide incentives or rewards to motivate employees to change their demeanor and/or expand their networks over time. For example, social capital incentives include future business opportunities, promotions, and new work that arise from a strong network and pleasing demeanor.
  `, `
  Social Capital Tools: Incentives<br><br>
  Do It: Find out what rewards employees want and either provide them or demonstrate how employees can obtain them if they change their demeanor or networks. For intrinsically motivated employees, you may explain how new interactive habits can lead to future business opportunities and more interesting work. For extrinsically motivated employees, you may provide rewards such as bonuses or better performance appraisals based on changing demeanor and networking to better fit the organization. You might also demonstrate how these will lead to promotion.<br><br>
  Don't Do It: Don't use incentives to increase social capital if any of these criteria apply:
  <ul>
      <li>It will create inequity with other employees.</li>
      <li>The employee doesn't want to change these habits.</li>
      <li>Demeanor and networking behavior reflect deep personality characteristics that are not changeable.</li>
      <li>It will create a short-term fix that leads to long-term problems or will encourage the employee to focus on interpersonal behavior at the cost of productivity.</li>
  </ul>
  Learn to Do It: If you don't know how to provide incentives, talk with your human resources department or a trusted colleague or take a course about incentives.<br><br>
  Delegate It: Ask someone else to provide incentives in these situations:
  <ul>
      <li>When you can't observe and accurately measure the employee's demeanor and
      networks
      </li>
      <li>When you don't have control over incentives that will motivate your employee</li>
  </ul>
  `],
  [`
  Social Capital Tools: Counsels
  <br><br>
  The interaction between a counselor and a participant is an attempt to analyze and resolve internal dynamics that impede an employee's performance. This tool is appropriate for an employee who has difficulty with building social ties, demonstrates inappropriate demeanor, or has low self-esteem that prevents the employee from doing his or her job.
  `, `
  Social Capital Tools: Counsel
  <br><br>
  Do It: If you choose to counsel employees yourself, set boundaries on the topics that you will discuss. For example, you may advise in areas such as networking and demeanor, but you should avoid personal matters and nonwork situations. Giving highly personal advice may lead to unanticipated negative consequences. Use this tool only when you have a trusting relationship with the employee.<br><br>
  Don't Do It: : Don't use this tool when the employee resists counseling. Don't implement this tool yourself if you can't be empathetic, supportive, and caring. Effective counseling, requires the ability to listen carefully to help an employee find his or her own answers. Don't use this if it will interfere with your ability to supervise the employee.<br><br>
  Learn to Do It: You can learn active listening skills that support and encourage others by attending classes and workshops.<br><br>
  Delegate It: If you are uncomfortable with intimate interactions with employees, have, someone else perform counseling. If the employee requests counsel, but you believe it would interfere with your objectivity or your working relationship, refer the employee to a colleague or to the human resources department. Encourage the employee to seek professional guidance from a therapist, social worker, or psychologist when the needs are beyond the scope of your training.
  `],
  [`
  Base Capital: Long-term Development
  <br><br>
  Long-term development involves the transformation of a person's values, cognitive style, and attitudes through strategies such as counseling, personal growth experiences in seminars and workshops, and extended mentoring and coaching.
  `, `
  Base Capital: Long-term Development
  <br><br>
  Do It: A person's values, cognitive style, and attitudes are difficult and costly to change. If an organization determines that enhancing performance of a key employee by changing his or her "inner foundation” is worth the investment, many approaches should be used together. Professional help from a counselor or coach, regular feedback and advice from trusted organizational insiders, and in-depth growth experiences in seminars and workshops should be used jointly. Successful development of these kinds of characteristics often takes years.
  <br><br>
  Don't Do It: Don't implement this tool when the cost of this strategy exceeds the benefit. To make a cost/benefit analysis, consider what the employee brings to the organ the cost (both in terms of actual money spent, time away from the work while attending developmental experiences, and time of coaches and mentors).
  <br><br>
  Learn to Do It: You can take courses or attend workshops to learn what steps should be included in an employee's long-term development plan. If you will be involved in mentoring, counseling, or coaching, classes and workshops can teach you active listening skills and how to give effective feedback. Your organization's human resources staff can also help.
  <br><br>
  Delegate It: If you prefer to maintain interpersonal distance from employees, but you have a key employee who requires long-term development, ask a human resources staff member, counselor, or performance-improvement expert to determine what steps should be included in the employee's long-term development plan. You can also use a third party to plan, monitor, and support the employee's long-term development.
  `],
  [`
  Base Capital: Transfer
  <br><br>
  When an employee's values, cognitive style, aptitudes, and attitudes don't match the job or team, but the employee is competent and qualified, you may choose to transfer that employee to a different team, department, or company location where his or her skills can be more effectively used.
  `, `
  Base Capital: Transfer
  <br><br>
  Do It: Determine a position that is a more appropriate match for the employee, discuss options with the employee, and transfer the employee if you both agree that a transfer is the best option. Refer to your company's policies and procedures and talk to human resources personnel to determine how best to implement this strategy.
  <br><br>
  Don't Do It: Don't implement a transfer when any of these situations exist:
  <ul>
    <li>The employee doesn't want to be transferred.</li>
    <li>A transfer would cause serious disruption to work processes or flow within your team or company.</li>
    <li>A transfer would be too costly for the company (e.g., an expensive relocation package that is not offset by the inputs brought by the employee).</li>
    <li>A transfer would cause a serious problem with morale not offset by productivity improvements gained by removing the employee from the department/team.</li>
  </ul>
  Learn to Do It: This is best handled by working with your company's human resources department and learning the guidelines set by your company.
  <br><br>
  Delegate It: If you are a leader who builds close emotional bonds and social ties with employees, this tool may be difficult for you to implement. You may request that the human resources staff handle the details and conversations to ensure professional and efficient movement.
  `],
  [`
  Base Capital: Fire
  <br><br>
  When an employee's values, cognitive style, aptitudes, and attitudes don't match the job or team demands, and development or transfer are not viable options, terminate the employee's employment with the company.
  `, `
  Base Capital: Fire
  <br><br>
  Do It: Work with human resources to follow company policies and procedures for initiating the termination process. Implement this strategy when an employee's "inner foundation" doesn't match the team, job, or company; the cost or changing the employee is too great; or the employee resists change.
  <br><br>
  Don't Do It: Don't implement this when any of these situations exist:
  <ul>
    <li>Firing the employee would seriously disrupt work processes or flow within your
    team or company.
    </li>
    <li>Firing would cause a serious problem with team morale not offset by improvements gained by getting the employee out of the company.</li>
    <li>You have not explored all causes and aren't certain that a long-term, relatively unchanging characteristic is causing problems.</li>
    <li>You want to fire the employee because of an interpersonal conflict that is the result of misperceptions and miscommunication.</li>
  </ul>
  Learn to Do It: This is best handled by working with your company's human resources department. To best learn how to be fair and effective, review employee handbooks and policy manuals for your company's termination process, and talk with human resources staff and others who have terminated employees.
  <br><br>
  Delegate It: If you are a manager who builds close emotional bonds and social ties with employees, this may be difficult for you to implement. You may request that a human resources staffperson handle the details and conversations to ensure professional and efficient termination.
  `],
  [`
  Intrinsic Needs: Recognition<br><br>
  Intrinsically motivated employees are driven by opportunities to learn and grow and need feedback to know that actions are leading to desired results. Recognition is a form of feedback that provides information about their achievement and competence.<br><br>
  Recognition is any form of verbal or written acknowledgment that reinforces appreciation and value for an employee's efforts and/or performance. Recognition can be publicly or privately communicated.
  `, `
  Intrinsic Needs: Recognition
  <br><br>
  Do It: If you don't know what kinds of recognition would motivate your employees, ask them what they would like. Use some of these methods to recognize these employees:
  <ul>
    <li>Thank them privately.</li>
    <li>Write a letter of commendation.</li>
    <li>Send a memo to the team and to others describing what they did that was effective.</li>
    <li>Recognize their employee's competence in front of coworkers verbally or with a token material reward that serves as a sign of achievement.</li>
  </ul>
  Don't Do It: Don't publicly recognize employees who would be embarrassed by being singled out in front of peers. Also, some employees are more motivated by opportunities for more challenging work than by verbal or written praise. For these employees, enriching, their jobs would be more effective. Don't use recognition if employees view it as manipulative or are extrinsically motivated.
  <br><br>
  Learn to Do It: Talk with coworkers and human resources staff to learn what kinds of recognition programs and options are available or commonly used in your organization. Human resources staff and coworkers can also teach you how to write effective commendations.
  <br><br>
  Delegate It: Have someone else implement public recognition if you are not comfortable praising individuals, particularly in public settings.
  `],
  [`
  Intrinsic Needs: Enrich Job
  <br><br>
  Intrinsically motivated employees thrive on achievement and challenge in their work. When work seems boring and routine, they tend to reduce efforts and perform below their potential. You can enrich an employee's job in these ways:
  <ul>
    <li>Add new tasks to the existing job so the employee uses more skills and creates a meaningful product.</li>
    <li>Allow the employee more decision-making authority.</li>
    <li>Give the employee more performance feedback.</li>
  </ul>
  To effectively enrich a job, you must know which aspects are essential, which are, malleable, and which motivate or demotivate the employees.
  `, `
  Intrinsic Needs: Enrich Job
  <br><br>
  Do It: Enrich a job by finding out which aspects of the job employees find dull and routine
  ewarding. If possible, change the job to include more activities that the employee finds motivating. You can also enrich a job by giving the employee more latitude in deciding how to meet goals, allowing the employee to set challenging goals, adding variety and responsibility to the job, and providing more feedback.
  <br><br>
  Don't Do It: Don't implement this if employees perceive job enrichment as adding more work for the same pay. Don't redesign the work if it will interfere with workflows in unproductive ways or if work can't be redesigned because of system factors. Employees who are motivated by external rewards or who prefer consistency and stability won't be motivated by this technique.
  <br><br>
  Learn to Do It: You can learn to implement this by taking a course or attending a workshop. To effectively enrich a job, you must first understand the job; your company's human resources department may provide you with a job description and information about job analysis.
  <br><br>
  Delegate It: Have someone else implement job enrichment if you are unable or unwilling to spend time learning about the job and analyzing its core functions. You may want to ask human resources to do this if this department is strong and if you are unsure what job duties you can change without altering the compensation structure for that job or the outputs needed by others.
  `],
  [`
  Intrinsic Needs: Create Teams
  <br><br>
  A team refers to a group of people working together toward a shared goal. Some employees perform at their peak when they have colleagues with whom to share ideas, information, and concerns. For these people, working together with others on teams, rather than alone, can be very motivating.
  `, `
  Intrinsic Needs: Create Teams
  <br><br>
  Do It: Provide opportunities to accomplish tasks by working with peers. This could range, from teams of two employees who share a job to a large group organized around a common goal or work product. Teams should have autonomy in how they operate, including how to divide tasks and reach goals.
  Don't Do It: Don't implement teams when
  <ul>
      <li>goals are best reached by individual efforts</li>
      <li>being required to work closely with others would demotivate the employee</li>
      <li>the nature of the work doesn't lend itself to team efforts</li>
      <li>you are not an effective team leader</li>
      <li>creating a team would cause problems with other employees and harm the larger group</li>
  </ul>
  Learn to Do It: Take courses, workshops, or seminars to strengthen your team leadership skills. Ask your employees for feedback about your strengths and weaknesses in leading teams. Leverage your strengths and improve your weaknesses through training or mentoring from a coworker who has strong team leadership skills.
  <br><br>
  Delegate It: Have someone else implement team creation when you don't have team leadership skills, don't have the time, or aren't interested in developing them. If you don't focus on building relationships, you may not be effective at building a collaborative, infrastructure among employees, in which case another person can help develop or run your team.
  `],
  [`
  Extrinsic Needs: Direct Control
  <br><br>
  Some employees perform best when directly supervised and closely monitored. This involves frequently observing employees or the outcomes of their work and regularly telling them what to do and how to do it.
  `, `
  Extrinsic Needs: Direct Control
  <br><br>
  Do It: To implement direct control, set clearly defined goals, rules, procedures, and accountabilities for employees. Clearly state what is expected and frequently check on employee progress. This works best when these types of situations exist:
  <ul>
    <li>The employee's work is simple and straightforward and has actions or outcomes that are easily observable.</li>
    <li>Employees lack maturity.</li>
    <li>Employees lack requisite skills and can learn from their manager.</li>
    <li>Employees lack self-confidence and need regular reassurance from their manager.</li>
    <li>You enjoy maintaining a great deal of consistency, predictability, and order in the workplace.</li>
  </ul>
  Don't Do It: Don't implement this with employees who require autonomy to get their jobs done or when you need employees to be creative in working with customers, products, and processes. Don't implement this with self-confident, independent, high-performing employees.
  <br><br>
  Learn to Do It: Take classes, read books, or work with mentors or other knowledgeable human resources representatives to learn how to set clear goals; track progress; and provide frequent, specific feedback to employees. Practice giving explicit and clear directions, observe what techniques require repeated clarification, and modify your communication to make it clear. Practice giving feedback that is effective, fair, balanced, and motivating.
  <br><br>
  Delegate It: If you don't enjoy setting precise goals and following up with employees on a regular basis, ask a human resources representative or other staff member to help you set appropriate rules and procedures for your department. Appoint someone to monitor and communicate feedback frequently for you.
  `],
  [`
  Extrinsic Needs: Create Rules<br><br>
  Some employees find consistency, clear expectations, and defined procedures to be motivating. You can create these by implementing rules and procedures to solve some problems. Rules are official requirements to do (or not do) specific things at work. Procedures are guidelines aimed at getting employees to do work in the same way and reducing variability in work behavior or outcomes.<br><br>
  When a lot of uncertainty and change exists, creating rules and procedures can motivate effective performance. When employees are new or don't know how to behave or do the work, or when work must be done consistently because of business necessities (such as a market niche of consistent service, rules and procedures are critical to motivate effective performance. Strict rules and procedures are essential for work that is highly regulated (e.g., pharmaceutical manufacturing), dangerous (e.g., work in manufacturing with machines, tools, equipment, or chemicals), and for which the consequences of mistakes can cost lives (e.g., medicine, police, and firefighting).
  `, `
  Extrinsic Needs: Create Rules
  <br><br>
  Do It: You can create rules in numerous ways. You can decide on a new rule or procedure for your entire department (e.g., all employees must be at their desks working by 8:30 a.m.). You can consult with others and then make the decision yourself. Or you can make the decision in a democratic fashion by having employees vote on the rule or procedure.
  <br><br>
  Don't Do It: Work that requires autonomy, creativity, innovation, and the free interchange of many different ideas (e.g., research and development) will be stifled by excessive rules, procedures, and policies. Don't implement this when rules reduce creativity and interfere with meeting goals.
  <br><br>
  Learn to Do It: Read books, take classes, and work with mentors or experienced and knowledgeable human resources staff. Review your organization's rules and procedures and discuss how they differ from group to group with coworkers. This will help you know the context and the organization's approach to rules and procedures.
  <br><br>
  Delegate It: Work with your human resources department to determine which rules are most conducive to creating the work environment and employee behaviors that will meet goals. If you tend to ignore the rules yourself, ask human resources or another authority to help you set appropriate rules and procedures for your department.
  `],
  [`
  Extrinsic Needs: Measure and Appraise
  <br><br>
  In many jobs, employees don't know how their managers view the quality and quantity of work they perform. Managers can develop and use systems to clearly define what "good performance" means, regularly measure employees' performance, and provide feedback. Measurement usually refers to outcomes that are easy to count (such as "dollars sold"); appraisal refers to measuring outcomes that are hard to count (such as customer service). Providing feedback about performance is important for most employees and can be highly motivating to extrinsically motivated people.
  `, `
  Extrinsic Needs: Measure and Appraise
  <br><br>
  Do It: Determine which aspects of performance you want employees to focus on and design a way to measure or appraise their success. Wherever possible, develop these goals jointly with employees. This increases their commitment and helps them view the goals as fair. If outcomes are easy to count, use objective measures. Also include quality issues, because employees are likely to do those things that you measure and appraise; managers sometimes inadvertently create systems that reward employees for poor-quality work. Help employees develop a performance plan to meet the goals that have been set.
  <br><br>
  Don't Do It: Don't implement if employees work best by setting their own goals and are demotivated by performance feedback, or if the work is highly subjective and not measurable by traditional methods (e.g., fine art).
  <br><br>
  Learn to Do It: You can learn to measure and appraise performance by taking classes or attending seminars or workshops on the subject. You can also work with your company's human resources department to find out what techniques are available within your organization to improve your skills in this area.
  <br><br>
  Delegate It: Managers should measure and appraise their employees' performance. Leaders who don't commonly structure work and monitor outcomes may find this challenging and unrewarding, but most employees need performance feedback to achieve and maintain high levels of performance. If you don't interact regularly with your employees, you should collect information from others who do in a structured and systematic way. This should be done by a neutral third party, for example, through a 360-degree feedback process that summarizes the responses of several people at each level.
  `],
  [`
  Extrinsic Needs: Rewards and Incentives
  <br><br>
  Employees who are motivated by external rewards tend to focus on the rewards that managers provide for work, such as money, promotions, and public recognition. Rewards can be provided in an ad hoc manner for goal performance, whereas incentives are formal standardized systems of rewards for performance. Be sure to reward both quantity and quality of work. Employees tend to do what you pay them for, and you can encourage them to make errors or provide poor-quality service through a desire to produce quantity rather than quality.
  `, `
  Extrinsic Needs: Rewards and Incentives
  <br><br>
  Do It: To implement rewards and incentives, determine the rewards employees want (e.g., money, promotion, recognition) and make them available if employees perform at certain levels.
  <ul>
    <li>Be sure that employees know what they have to do to achieve the rewards.</li>
    <li>Have clear and fair ways of measuring employee performance so you don't reward employees just for being nice to you.</li>
    <li>Be consistent in providing rewards, without playing favorites.</li>
  </ul>
  Don't Do It: Don't implement this when any of the following situations exist:
  <ul>
    <li>Rewards are inconsistent from employee to employee, creating inequity.</li>
    <li>Employees complain or ask for rewards; this may result in rewarding employees for complaining rather than performance.</li>
    <li>You cannot financially afford to provide the rewards.</li>
    <li>You haven't thoroughly analyzed what's causing performance problems or considered the consequences of providing incentives.</li>
    <li>Rewards are based on the quantity of work but not the quality.</li>
    <li>Employees compete for rewards when they should cooperate or collaborate.</li>
  </ul>
  Learn to Do It: Take a course about incentives. Weigh the costs/benefits of providing those incentives; if appropriate, provide them. Check with human resources to ensure that the rewards don't conflict with company policy.
  <br><br>
  Delegate It: Have someone else implement rewards and incentives in these types of situations: 
  <ul>
    <li>You can't observe or accurately measure the employee's performance.</li>
    <li>You don't have control over incentives that will motivate your employee.</li>
    <li>The human resources department will design incentive systems for you.</li>
    <li>You are unable or unwilling to track and monitor performance after incentives.</li>
  </ul>
  `],
  [`
  Equity: Change Comparison
  <br><br>
  Employees who evaluate the fairness of their situations by comparing themselves with others can compare themselves with others in the same job, employees in other jobs, themselves in previous jobs, and so on. Often, employees may feel unfairly treated because they are comparing themselves with other employees with different backgrounds, expertise, or experiences. Guiding employees to change whom they compare themselves with can create satisfaction and motivation without changing jobs or rewards.
  `, `
  Equity: Change Comparison
  <br><br>
  Do It: Ask your employees with whom they compare themselves. If it is an inappropriate comparison, explain the ways in which the two employees are not equal. You can do this by providing more information about key factors of the employees or employees' job or role; by directly telling your employees why and how you make comparisons; and by focusing their attention on others whose contributions, qualifications, and position are equivalent to theirs.
  <br><br>
  Don't Do It: Don't do this when employees already compare themselves appropriately. This technique is only needed when a genuine inequity should be addressed and reduced. Avoid using this technique when the motivational problem is caused by something other than feelings of inequity.
  <br><br>
  Learn to Do It: Learn to help employees reframe their comparisons by taking a course or workshop on active listening or coaching, by motivating employees, or by working with a mentor. Having this skill is helpful, because many motivation problems are caused by inaccurate perceptions or inappropriate comparisons.
  <br><br>
  Delegate It: If you aren't comfortable asking personal questions about employees' needs and dissatisfactions or don't have strong active listening skills, you may not be able to learn what kinds of perceptions cause the problem. Be careful not to blame the employee for inaccurate perceptions. If you don't have this skill and choose not to develop it, ask a knowledgeable human resources representative or a colleague you trust to help you consider the problem, ask questions, and consult with the employees to change their comparisons.
  `],
  [`
  Equity: Change Perception of Inputs/Outcomes
  <br><br>
  Employees' beliefs in the fairness of their treatment depend on their views of what they contribute to the work situation (inputs compared with what others contribute and what they receive from the work situation (outcomes) compared with what others get. You can motivate and satisfy employees by changing their view of their contributions and outcomes compared with others' contributions. Contributions include skills, knowledge, networks, reputation, effort, experience, personality, and so on. Outcomes include salary, benefits, friendships, satisfaction from helping others, a feeling of accomplishment, status, and so on. This is a flexible technique because people often are unaware of all these factors for themselves and others.
  `, `
  Equity: Change Perception of Inputs/Outcomes
  <br><br>
  Do It: If an employee makes an appropriate comparison with another employee but isn't aware of differences in contributions or outcomes, tell the employee about what the other employee contributes or produces that is different (e.g., a reputation that helps the firm or time spent working from home). Alternatively, you can help the employee consider his or her own contributions more accurately. You may also tell the employee about different rewards that both employees get, for example, opportunities for networking or positive work environment. You can provide more information on aspects he or she may not think about but that you and the organization care about.
  <br><br>
  Don't Do It: Don't compare inputs/outcomes when the other employee is not appropriate and comparable or when an inequity exists not based on differential inputs/outcomes.
  <br><br>
  Learn to Do It: Learn to help employees reframe their inputs and outcomes by taking a course or workshop on active listening or coaching or by working with a mentor. Having this skill is helpful, because many motivation problems are caused by inaccurate perceptions or inappropriate comparisons.
  <br><br>
  Delegate It: If you aren't comfortable asking personal questions about employees' needs and dissatisfactions or don't have strong, reflective listening skills, you may not be able to learn what kinds of perceptions cause the problem. If you don't have this skill and choose not to develop it, ask a knowledgeable human resources representative or a colleague you trust to help you consider the problem, ask questions, and consult with the employees to change their comparisons.
  `],
  [`
  Equity: Change Outcomes
  <br><br>
  If employees are dissatisfied and demotivated because they perceive that they are not fairly rewarded for their work compared with others, you can motivate them by changing the outcomes employees get from work. That is, you can provide more rewards, including a feeling of accomplishment or satisfaction from helping others, salary, benefits, bonuses, friendships, status, and so on.
  `, `
  Equity: Change Outcomes
  <br><br>
  Do It: Ask the employee why he or she feels unfairly treated and inquire about the types of rewards that are important. If a genuine inequity in rewards exists, you can change the job, work environment, or remuneration. For example, if employees feel unfairly treated because they do the same job with the same credentials as another employee yet receive less pay, make the salaries equivalent. You should work with your company's human resources department and your manager to stay within company policies and procedures.
  <br><br>
  Don't Do It: Don't implement change outcomes if these types of situations exist:
  <ul>
    <li>Changing the outcomes would create inequity with other employees.</li>
    <li>You cannot financially afford to provide the rewards.</li>
    <li>You haven't thoroughly analyzed what's causing performance problems or considered the consequences of changing the reward structure.</li>
  </ul>
  Learn to Do It: Take a course or workshop about rewards and compensation or talk with your human resources department about rewards and compensation.
  <br><br>
  Delegate It: Have someone else implement this technique in these types of situations:
  <ul>
    <li>You're not sure what motivates individuals.</li>
    <li>You're unable or unwilling to track and monitor performance after rewards are provided to make sure they resolve the problem.</li>
    <li>You don't have control over outcomes and rewards that will motivate your
    employee.</li>
    <li>You have a strong human resources department that will design reward systems for you.</li>
  </ul>
  `],
  [`
  Equity: Change Inputs
  <br><br>
  "Inputs" are all the things an employee contributes to the workplace such as skill, knowledge, effort, intellectual capital, networks, resources, and demeanor. If an employee perceives an inequity in his or her rewards, you can reduce inequity by changing the inputs that the employee brings to his or her work. Employees commonly reduce their inputs by reducing their effort (or motivation), which is counterproductive when you need to increase your employees' motivation. However, you can encourage employees to reduce other inputs, which can restore a feeling of fairness and increase motivation and satisfaction.
  `, `
  Equity: Change Inputs
  <br><br>
  Do It: Ask your employee why he or she feels unfairly treated and what working, arrangements might be preferred. You can encourage employees to reduce some of their contributions, perhaps by working some days from home, sharing a job with another person, or using other personnel to do part of their work.
  <br><br>
  Don't Do It: Don't implement this tool if any of these situations exist:
  <ul>
    <li>Changing inputs creates inequity with other employees.</li>
    <li>Changing inputs rewards the employee for complaining rather than performance.</li>
    <li>Changing inputs is a short-term fix that would lead to longer-term problems, such as essential work not being completed.</li>
    <li>Eliminate the employee's perception of inequity by changing the people to whom the employee compares himself or herself, or the employee's perceptions of inputs or outcomes.</li>
    <li>You are unable or unwilling to track and monitor performance after changes are made.</li>
  </ul>
  Learn It: Learn about the types of work arrangements that are used or allowed in your company. Check with the human resources department to ensure that some options are within company policy (e.g., telecommuting).
  <br><br>
  Delegate It: Have someone else implement this technique if 
  <ul>
    <li>you do not have the knowledge, skills, or inclination to find out how the employees
    view their contributions and rewards.</li>
    <li>you do not have the knowledge, skills, or inclination to explore other options for the employee or to institute job sharing.</li>
    <li>you have a strong human resources department to assist you.</li>
  </ul>
  `],
  [`
  E ➜ P Expectancy: Counsel
  <br><br>
  Low self-esteem may cause an employee to believe that efforts won't lead to desired performance. You may counsel the employees to enable them to change their expectation of success, thereby improving their motivation. Counseling involves intimate, in-depth, one-on-one interaction between a counselor and participant aimed at analyzing and resolving a person's internal dynamics that impede performance.
  `, `
  E ➜ P Expectancy: Counsel
  <br><br>
  Do It: Implement this tool when an employee doesn't perform to capacity because of low self-esteem. If you choose to counsel an employee yourself, you may build self-esteem by acknowledging what the employee does well, praising good performance, and rewarding, accomplishments, but you should avoid giving advice on personal matters and nonwork, situations. Giving highly personal advice may lead to unanticipated, negative consequences. Use this tool only when you have a strong, trusting relationship with the employee.
  <br><br>
  Don't Do It: Don't implement counseling when the employee resists it. Don't implement this yourself if you can't be empathetic, supportive, and caring. Effective counseling requires the ability to listen carefully to help a person find his or her own answers. Don't use this if it will interfere with your ability to supervise the employee.
  <br><br>
  Learn It: Attend classes and workshops to learn active listening and supportive behavior skills.
  <br><br>
  Delegate It: If you are uncomfortable with intimate interactions with employees, have, someone else implement this. If the employee requests counseling, but you believe it would interfere with your objectivity or your working relationship, refer this to a colleague or human resources personnel. Encourage an employee to seek professional guidance from a therapist, social worker, or psychologist when the employee's needs are beyond the scope of your training.
  `],
  [`
  E ➜ P Expectancy: Train/Develop
  <br><br>
  An employee may not expend effort because he or she doesn't have the knowledge or skills to perform as expected. Training and development can solve problems of this type. Training and development may include any number of structured learning opportunities to increase knowledge and skills, such as
  <ul>
    <li>classes and courses</li>
    <li>lectures, seminars, and conferences</li>
    <li>reading</li>
    <li>job rotations</li>
  </ul>
  Less-structured, experiential learning opportunities include,
  <ul>
    <li>Informal job-sharing</li>
    <li>Informal on-the-job training</li>
  </ul> 
  `, `
  E ➜ P Expectancy: Train/Develop
  <br><br>
  Do It: Implement this tool by sending an employee to training or development courses or providing unstructured, experiential learning opportunities. Use this approach when the skills or knowledge can be learned in a short time, are unlikely to be resisted by the employee, and don't involve changing long-term beliefs or characteristics.
  Don't Do It: Don't use this tool if
  <ul>
    <li>the employee doesn't have a knowledge or skill deficiency.</li>
    <li>the problem is caused by an external system.</li>
    <li>the employee resists training.</li>
    <li>the training would take longer than a few months.</li>
  </ul>
  Learn It: Your company's human resources department can help you analyze the employee's skill and knowledge deficiencies. The human resources department can also tell you what resources are available for training and development.
  <br><br>
  Delegate It: Have someone implement this when you don't know what training is available, you don't have access to knowledgeable trainers, or you have a sizable human resources department with knowledgeable people to do this for you.
  `],
  [`
  E ➜ P Expectancy: Increase Resources
  <br><br>
  An employee may not expend effort because he or she doesn't have the necessary resources to do the work at an adequate level. Resources might include technology, tools, machinery, hardware, money, time, or help from other people.
  `, `
  E ➜ P Expectancy: Increase Resources
  <br><br>
  Do It: Consult with the employee to identify which resources he or she lacks; be careful to distinguish essential resources from desirable resources. Then acquire or make available those resources, working with your team, other managers, or the human resources department as necessary.
  <br><br>
  Don't Do It: Don't implement this if any of these types of situations exists:
  <ul>
    <li>Increasing the resources will create inequity among employees.</li>
    <li>The source of the problem is lack of knowledge, skills, ability, or self-esteem.</li>
    <li>You do not know what resources are blocking the employee from accomplishing acceptable work.
    </li>
    <li>You do not have the authority or ability to authorize or obtain resources.</li>
  </ul>
  Learn It: Attend project management courses, read books, or work with a mentor to learn how to anticipate which tools and resources employees will need to successfully implement a project. Obtain feedback from employees after they complete tasks to identify the essential resources.
  <br><br>
  Delegate It: Have others do this if you don't have skills in project planning and resource acquisition, and you don't have the time or the inclination to learn the skills. If you don't have the authority to obtain resources, ask a colleague or your manager for assistance.
  `],
  [`
  E ➜ P Expectancy: Mentor/Coach
  <br><br>
  If an employee doesn't believe efforts will lead to desired performance, coaching or mentoring can help build skills and self-esteem to change this belief. Mentors and coaches can increase self-confidence, provide feedback, and help improve skills necessary to succeed.
  `, `
  E ➜ P Expectancy: Mentor/Coach
  <br><br>
  Do It: You can implement this tool in the following ways:
  <ul>
    <li>Meet regularly with the employee.</li>
    <li>Observe how the employee does his or her work.</li>
    <li>Provide feedback on what the employee does well.</li>
    <li>Give advice for improvement.</li>
    <li>Set multiple, small goals that create opportunities for success in areas of weakness.</li>
  </ul>
  Don't Do It: Don't implement this when you don't have the patience, time, or inclination to develop your employees; building self-esteem is a gradual process that requires support and understanding. Avoid providing personal feedback if the employee doesn't want the feedback, and don't assign small goals if the employee doesn't want to develop skills in that area.
  <br><br>
  Learn It: Attend seminars and workshops on mentoring or coaching others. Observe coworkers who frequently mentor others, and ask them to mentor you in the art of mentoring.
  <br><br>
  Delegate It: Have someone else mentor your employees if you believe a mentor/coach relationship with employees will detract from your ability to manage them objectively. Ask someone else to coach an employee if you prefer more socially distant relationships with employees.
  `],
  [`
  P ➜ O Expectancy: Change Rewards
  <br><br>
  If the rewards currently provided by the job are not desirable to employees, they won't expend energy to obtain them. Rewards can include many different kinds of extrinsic outcomes, such as salary, bonuses, or promotion. Jobs can also provide intrinsic rewards, such as social interactions with others and feelings of accomplishment or independence. If employees don't value the outcomes they get from work, you should change the outcome.
  `, `
  P ➜ O Expectancy: Change Rewards
  <br><br>
  Do It: You can change your employees' rewards by changing the work to be more teambased, giving employees more autonomy and responsibility for quality and decisionmaking, or increasing salaries or other financial rewards. You must first identify what work outcomes the employees care about, analyze the effects of making these changes on other employees, weigh the costs/benefits of various changes, and then implement job redesign or reward systems.
  <br><br>
  Don't Do It: Don't implement this if any of these types of situations exists:
  <ul>
    <li>It would reward employees for complaining rather than performing.</li>
    <li>It would create inequity with other employees.</li>
    <li>It would cost more than you can afford.</li>
    <li>It would remove rewarding conditions for other employees (e.g., by changing the work to team-based against others' wishes).</li>
    <li>You are not comfortable delegating decision-making authority to your employees or changing the way the work is done.</li>
  </ul>
  Learn It: Take courses, read books, or talk to your company's human resources department to learn about the variety of reward structures that are available and the different ways of designing work.
  <br><br>
  Delegate It: Have someone else do this if 
  <ul>
    <li>you are unable or unwilling to change the rewards structure or job design.</li>
    <li>you do not have the skills or inclination to find out how the employee views his or her rewards and which rewards are causing motivation problems.
    </li>
    <li>you do not have the knowledge, skills, or inclination to design work differently.</li>
    <li>you do not have the authority to change rewards but others do.</li>
    <li>you have a strong human resources department that can assist you.</li>
  </ul>
  `],
  [`
  P ➜ O Expectancy: Create Incentives
  <br><br>
  If employees are rewarded regardless of whether they perform well, some employees won't be motivated to perform well. You can create incentives by creating formal systems that provide specific rewards, such as bonuses or commissions, to employees if they perform at a specified level. Incentives must be clearly linked with concrete, observable performance.
  `, `
  P ➜ O Expectancy: Create Incentives
  <br><br>
  Do It: If rewards that are currently available aren't motivating to the employee, work with your company's human resources department to generate new incentives. Incentives can range from money (such as bonuses and commissions) to recognition (small, public awards, such as employee-of-the-month awards, an expensive pen, or a free dinner).
  <br><br>
  Don't Do It: Don't implement this if these types of situations exist:
  <ul>
    <li>Creating incentives causes inequity with other employees.</li>
    <li>Creating incentives causes a short-term fix that could lead to longer-term problems, such as a reduction in intrinsic motivation.</li>
    <li>Creating incentives motivates inappropriate behaviors such as low-quality work or lack of cooperation with colleagues.</li>
  </ul>
  Learn It: Learn about the types of incentives that appeal to employees, weigh the costs and benefits of providing those incentives, and if appropriate, provide them. Work with your company's human resources department and review company policies to ensure that you are within appropriate guidelines.
  <br><br>
  Delegate It: Ask someone else to implement if 
  <ul>
    <li>you are unable or unwilling to track and monitor performance after incentives are provided.</li>
    <li>you don't have the knowledge, skills, or inclination to find out which rewards employees most value.</li>
    <li>you don't have the knowledge, skills, or inclination to design rewards differently.</li>
    <li>you have a strong human resources department with personnel who can assist with this.</li>
  </ul>
`],
  [`
  P ➜ O Expectancy: Measure and Publish Performance,
  <br><br>
  In many jobs, employees don't know how managers and others view the quality and quantity of their work or the success of their efforts. This reduces the motivation of most employees. Managers should develop systems to clearly and fairly measure performance, regularly use such measurements, and publicize the results.<br><br>
  Making the information public can motivate employees and ensure that they know the basis for rewards.
  Determine which aspects of performance you want employees to focus on and design a way to measure their success.
  `, `
  P ➜ O Expectancy: Measure and Publish Performance,
  <br><br>
  Do It: Some outcomes are easily quantifiable, but you should also include quality issues because employees are likely to do those things that you measure and appraise. Creating systems that reward employees for poor-quality work is easy, but it's also detrimental to organizational success. If the work requires cooperative efforts between employees, measure the group's success instead of the individual's success. Examples of measures are customer satisfaction surveys and weekly sales by employee or by team. If you don't usually structure work and monitor outcomes, you may find the process of monitoring and publishing performance challenging and unrewarding.
  <br><br>
  Don't Do It: Don't implement if any of these types of situations exist:
  <ul>
    <li>Measuring and publishing performance embarrasses employees.</li>
    <li>The work is highly subjective and not measurable by traditional methods (e.g., fine art).</li>
  </ul>
  Learn It: Attend a class, seminar, or workshop on measuring performance and outcomes. Ask your company's human resources department to teach you to develop or use these systems.
  <br><br>
  Delegate It: Hire consultants who will design measurement systems for you, or work with your company's human resources department to develop new measurement techniques or use existing ones. It is generally better for managers to use measurement systems once they have been designed. However, if you are not willing to monitor or publish performance, you can have a consultant, a colleague, or trusted personnel from the human resources department perform this function.   
  `],
  [`
  P ➜ O Expectancy: Change Perception
  <br><br>
  Employees' motivation is partly determined by their belief that their performance will lead to outcomes that they value. You can motivate and satisfy employees by changing her view of the likelihood that their work will be rewarded or by focusing their attention on different kinds of outcomes that are more likely. Outcomes include salary, benefits, friendships, satisfaction from helping others, a feeling of accomplishment, status, and so on. This is a flexible technique because people often are unaware of all these factors for themselves and others.
  `, `
  P ➜ O Expectancy: Change Perception
  <br><br>
  Do It: If an employee's performance is likely to lead to positive outcomes, ask him or her what he or she thinks will result from his or her high performance. If he or she isn't aware of some of rewards, tell him or her about them (e.g., contribution to a positive performance evaluation, or helping him towards a promotion). You can help him or her to focus on rewards that he or she does not think about, such as opportunities for networking. Alternatively, you can help him or her consider his or her level of performance more accurately.
  <br><br>
  Don't Do It: Don't try to change an employees' view of the likelihood of a reward for performance when in fact the likelihood of their receiving rewards is low.
  <br><br>
  Learn to Do It: Learn to help employees change their expectations by taking a course or workshop on motivating employees or by working with a mentor. Having this skill is helpful, because many motivation problems are caused by inaccurate perceptions or failure to focus on rewards that are taken for granted.
  <br><br>
  Delegate It: If you aren't comfortable asking personal questions about employees' desires and dissatisfactions, or don't have strong reflective listening skills, you may not be able to learn what kinds of perceptions cause the problem. You must be careful not to blame the employee for inaccurate perceptions. If you don't have this skill and choose not to develop it, ask a knowledgeable human resources representative or a colleague whom you trust to help you consider the problem, ask questions, and consult with the employee to change his or her expectations.  
  `],
]

const elementCatLink = [
  'category-1', // Cause of Problem
  'toolcat-0', // System Tools
  'category-2', // Source of Internal Problems
  'category-3', // Source of Ability Problems
  'category-4', // Source of Effort Problems
  'toolcat-1', // Human Capital Tools
  'toolcat-2', // Social Capital Tools
  'toolcat-3', // Base Capital Tools , 7
  'category-5', // Employee Needs
  'toolcat-6', // Equity Tools
  'toolcat-7', // E ➜ P Expectancy Tools
  'toolcat-8', // P ➜ O Expectancy Tools , 11
  'toolcat-4', // Intrinsic Tools
  'toolcat-5', // Extrinsic Tools
]

const lines = [
  {
    name: 'gap',
    x: 4,
    y: 0,
    ex: 4,
    ey: 46,
    direction: 'vertical',
  },
  {
    name: 'gap-system',
    x: 4,
    y: 46,
    ex: 94,
    ey: 46,
    direction: 'horizontal',
  },
  {
    name: 'system-internal',
    x: 94,
    y: 46,
    ex: 94,
    ey: 86,
    direction: 'vertical',
  },
  {
    name: 'internal-ability',
    x: 94,
    y: 86,
    ex: 184,
    ey: 86,
    direction: 'horizontal',
  },
  {
    name: 'ability-effort', 
    x: 184,
    y: 86,
    ex: 184,
    ey: 126,
    direction: 'vertical',
  },
  {
    name: 'ability-human', // index = 5
    x: 184,
    y: 86,
    ex: 274,
    ey: 86,
    direction: 'horizontal',
  },
  {
    name: 'human-social',
    x: 274,
    y: 86,
    ex: 274,
    ey: 126,
    direction: 'vertical',
  },
  {
    name: 'social-base',
    x: 274,
    y: 126,
    ex: 274,
    ey: 166,
    direction: 'vertical',
  },
  {
    name: 'effort-needs', // index = 8
    x: 184,
    y: 126,
    ex: 274,
    ey: 126,
    direction: 'horizontal',
  },
  {
    name: 'needs-equity',
    x: 274,
    y: 126,
    ex: 274,
    ey: 166,
    direction: 'vertical',
  },
  {
    name: 'equity-ep',
    x: 274,
    y: 166,
    ex: 274,
    ey: 206,
    direction: 'vertical',
  },
  {
    name: 'ep-po',
    x: 274,
    y: 206,
    ex: 274,
    ey: 246,
    direction: 'vertical',
  },
  {
    name: 'needs-intrinsic',
    x: 274,
    y: 126,
    ex: 364,
    ey: 126,
    direction: 'horizontal',
  },
  {
    name: 'intrinsic-extrinsic',
    x: 364,
    y: 126,
    ex: 364,
    ey: 166,
    direction: 'vertical',
  }
]

const lineEls = [
  [0], // Gap
  [0, 1], // System
  [0, 1, 2], // Internal
  [0, 1, 2, 3], // Ability
  [0, 1, 2, 3, 4], //Effort
  [0, 1, 2, 3, 5], //Human Capital
  [0, 1, 2, 3, 5, 6], // Social Capital
  [0, 1, 2, 3, 5, 6, 7], // Base Capital
  [0, 1, 2, 3, 4, 8], // Needs
  [0, 1, 2, 3, 4, 8, 9], // Equity
  [0, 1, 2, 3, 4, 8, 9, 10], // E -> P
  [0, 1, 2, 3, 4, 8, 9, 10, 11], // P -> O
  [0, 1, 2, 3, 4, 8, 12], // Intrinsic
  [0, 1, 2, 3, 4, 8, 12, 13], // Extrinsic
]

let lineColor = 'rgb(110, 8, 8)';
let lineWidth = 2;
let finalPoint;

//Draw line
function drawLine(x, y, ex, ey, color, width) {
  ctx.beginPath();
  ctx.strokeStyle = color
  ctx.lineWidth = width;
  ctx.moveTo(x,y);
  ctx.lineTo(ex,ey);
  ctx.stroke();
}

function drawArrow(point) {
  let x = point.ex;
  let y = point.ey;
  if (point.direction === 'vertical') {
    ctx.beginPath();
    ctx.moveTo(x,y+4);
    ctx.lineTo(x-4,y-2);
    ctx.lineTo(x+4,y-2);
    ctx.fillStyle = lineColor;
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(x+4,y);
    ctx.lineTo(x-2,y-4);
    ctx.lineTo(x-2,y+4);
    ctx.fillStyle = lineColor;
    ctx.fill();
  }

}

//Show sub-elements
function selectHandler(event) {
  const target = event.target
  const index = Number(target.id.split('-')[2]);
  const next = document.getElementById(elementCatLink[index]);
  const sourceType = elementCatLink[index].split('-');
  const lineIngs = lineEls[index]
  initialize(target, index, sourceType);
  description.innerHTML = explanations[index]
  next.classList.remove('hide');
  if (target.className === 'select-element') {
    const catIndex = Number(target.parentElement.id.split('-')[1]);
    for (let i = 0; i <= catIndex; i++) {
      selectElementCats[i].classList.add('hide');
    }
  }
  if (sourceType[0] === 'toolcat' && sourceType[1] !== '0') {
    legend.style.display = 'flex';
  }
  finalPoint = lines[lineIngs[lineIngs.length - 1]]
  lineIngs.forEach(ing => {
    drawLine(lines[ing].x, lines[ing].y, lines[ing].ex, lines[ing].ey, lineColor, lineWidth);
  })
  drawArrow(finalPoint);
}

//Show tools
function toolHandler(event) {
  const index = Number(event.target.id.split('-')[2]);
  currentToolIndex = index;
  if (index === 0) {
    explBtn.style.display = 'none';
    toolCloseBtn.style.display = 'flex';
  }
  explanationContent.innerHTML = toolDescriptions[index][0];
  explanationBox.classList.remove('hide');
}

//Back to initial states
function initialize(target, index, sourceType) {
  selectElementCats.forEach(cat => {
    cat.classList.remove('hide');
  })
   if (sourceType[0]==='category'){
    for (let i = Number(sourceType[1]); i<categories.length; i++){
      categories[i].classList.add('hide');
      if (i === 3) {
        categories[4].classList.add('hide')
      } else if (i === 4) {
        categories[3].classList.add('hide')
      }
    }
  } else if (elementCatLink[index] === 'toolcat-0') {
    for (let i = 2; i<categories.length; i++){
      categories[i].classList.add('hide');
      if (i === 3) {
        categories[4].classList.add('hide')
      } else if (i === 4) {
        categories[3].classList.add('hide')
      }
    }
  } else if (index >=9 && index <=11) {
    categories[5].classList.add('hide');
    selectElementCats[4].classList.remove('hide');
  }
  const toolCats = document.querySelectorAll('.toolcat');
  toolCats.forEach(toolCat => {
    toolCat.classList.add('hide');
  })
  explBtn.style.display = 'flex';
  legend.style.display = 'none';
  ctx.clearRect(0, 0, graph.width, graph.height);
}

// Close instructions
instCloseBtn.addEventListener('click', () => {
  clicking.play();
    instruction.classList.add('hide');
});

// Open instructions
instructionBtn.addEventListener('click', () => {
  clicking.play();
    instruction.classList.remove('hide');
});

// Open implementation
explBtn.addEventListener('click', (event) => {
  clicking.play();
  explanationBox.classList.add('hide');
  impleContent.innerHTML = toolDescriptions[currentToolIndex][1];
  impleContent.scrollTop = 0;
  implementation.classList.remove('hide');
});

// Close Implementation
impleCloseBtn.addEventListener('click', () => {
  clicking.play();
  implementation.classList.add('hide');
})

// Close tool explanation
toolCloseBtn.addEventListener('click', () => {
  clicking.play();
  explanationBox.classList.add('hide');
})