const errorElement = `
<div style="padding: 40px;">
	<img width='100' height='100' src='images/no-results.png' alt='No results found!'/>
</div>
<span>No results found!</span>
`;

function previousButton() {
	const getIds = window.searchResults.map((s) => s.id)
	const currentIndex = getIds.indexOf(window.currItem.id)
	updateSearchResult(window.searchResults[currentIndex - 1])
}

function nextButton() {
	const getIds = window.searchResults.map((s) => s.id)
	const resultIndex = getIds.indexOf(window.currItem.id)
	updateSearchResult(window.searchResults[resultIndex + 1])
}

function updateSearchResult(results) {
	window.currItem = results;
	document.getElementById('search-result-div').style.display = 'none'
	document.getElementById('show-resume').style.display = 'block'
	applicantInfo(results);
}

function getResumeHeader(name, position) {
	let applicantName = document.getElementById('name')
	let appliedFor = document.getElementById('appliedFor')
	applicantName.innerText = name;
	appliedFor.innerText = position;
}

function getApplicantInfo(basics) {
	let phoneNumber = document.getElementById('phonenumber');
	let emailId = document.getElementById('email');
	let linkedin = document.getElementById('linkedin');

	phoneNumber.innerText = basics.phone;
	emailId.innerText = basics.email;

	linkedin.innerHTML = '';
	let linkedInField = document.createElement('a');
	linkedInField.innerText = 'Linkedin';
	linkedInField.href = basics.profiles.url;
	linkedin.appendChild(linkedInField);
}

function getTechnicalSkills(keywords) {
	let technicalSkills = document.getElementById('technicalskills')
	technicalSkills.innerHTML = ''
	keywords.forEach(k => {
		technicalSkills.appendChild(document.createTextNode(k));
		technicalSkills.appendChild(document.createElement('br'));
	})
}

function getHobbies(hobbies) {
	let hobbiesNode = document.getElementById('hobbies')
	hobbiesNode.innerHTML = ''
	hobbies.forEach(h => {
		hobbiesNode.appendChild(document.createTextNode(h));
		hobbiesNode.appendChild(document.createElement('br'));
	})
}

function getCompanyDetails(companyInfo) {
	let companyName = document.getElementById('companyname');
	companyName.innerText = companyInfo['Company Name'];

	let position = document.getElementById('position');
	position.innerText = companyInfo.Position;
	
	let startDate = document.getElementById('startdate')
	startDate.innerText = companyInfo['Start Date']
	
	let endDate = document.getElementById('enddate');
	endDate.innerText = companyInfo['End Date'];
	
	let summary = document.getElementById('summary')
	summary.innerText = companyInfo.Summary
}

function getProjectDetails(project) {
	let projects = document.getElementById('projects');
	projects.innerHTML = "";
	let projectName = project.name;
	let projectDescription = project.description;
	let projectNameCreateElement = document.createElement('b');
	projects.innerText = projectName + ': ';
	let projectDesc = document.createElement('span');
	projectDesc.innerText = projectDescription;
	projects.appendChild(projectNameCreateElement);
	projects.appendChild(projectDesc);
}

function getEducationDetails(education) {
	let ug = document.getElementById('ug')
	let seniorSecondary = document.getElementById('seniorsecondary')
	let highScool = document.getElementById('highschool')

	ug.innerText = `${education.UG.institute}, ${education.UG.course}, ${education.UG['Start Date']}, ${education.UG['End Date']}, ${education.UG.cgpa}`
	seniorSecondary.innerText = `${education['Senior Secondary'].institute}, ${education['Senior Secondary'].cgpa}`
	highScool.innerText = `${education['High School'].institute}, ${education['High School'].cgpa}`
}

function getInternshipDetails(internship) {
	let internshipName = document.getElementById('internshipname')
	let internshipPosition = document.getElementById('internshipposition')
	let internshipStartDate = document.getElementById('internshipstartdate')
	let internshipEndDate = document.getElementById('internshipenddate')
	let internshipSummary = document.getElementById('internshipsummary')

	internshipName.innerText = internship['Company Name']
	internshipPosition.innerText = internship.Position
	internshipStartDate.innerText = internship['Start Date']
	internshipEndDate.innerText = internship['End Date']
	internshipSummary.innerText = internship.Summary
}

function getAchievementsDetails(achievementsInfo) {
	let achievements = document.getElementById('achievements')
	achievements.innerHTML = ''
	achievementsInfo.forEach(a => {
		let achivementList = document.createElement('li')
		achivementList.innerText = a
		achievements.appendChild(achivementList);
	})
}

function disableNavigationButtons(resultSet) {
	const getIds = window.searchResults.map((s) => s.id);
	const resultIdx = getIds.indexOf(resultSet.id);
	document.getElementById('prev-button').disabled = resultIdx === 0;
	document.getElementById('next-button').disabled = resultIdx === getIds.length-1;
}

function afterSearch(){
	let searchValue = document.getElementById('searchbox').value;
	if (searchValue.length === 0) {
		window.currItem = data.resume[0]
		window.searchResults = data.resume
		updateSearchResult(data.resume[0])
		return
	}
	let searchResults = search(searchValue);
	window.searchResults = searchResults;
	let listDiv = document.getElementById('search-results');
	listDiv.innerHTML = "";
	if(searchResults.length === 0) {
		listDiv.innerHTML = errorElement;
		document.querySelector('.resume').classList.add('hidden');
	}
	showResultsAndHideResume();
	searchResults.map(s => {
		let lielement = document.createElement("li");
		lielement.appendChild(addSearchResultLink(s))
		listDiv.appendChild(lielement);
	})
}

function search(value) {
    return data.resume.filter((n) => n.basics.AppliedFor.toLowerCase().startsWith(value.toLowerCase()));
}

function showResultsAndHideResume() {
	document.getElementById('search-result-div').style.display = 'block';
	document.getElementById('show-resume').style.display = 'none';
}

function addSearchResultLink(results) {
	let elementToAdd = document.createElement('a');
	elementToAdd.innerText = results.basics.name;
	elementToAdd.setAttribute('href', '#');
	elementToAdd.addEventListener('click', () => updateSearchResult(results));
	document.querySelector('.resume').classList.remove('hidden');
	elementToAdd.setAttribute('data', `result: ${results}`);
	return elementToAdd;
}	

function applicantInfo(results) {
	getResumeHeader(results.basics.name, results.basics.AppliedFor);
	getApplicantInfo(results.basics);
	getTechnicalSkills(results.skills.keywords);
	getHobbies(results.interests.hobbies);
	getCompanyDetails(results.work);
	getProjectDetails(results.projects);
	getEducationDetails(results.education);
	getInternshipDetails(results.Internship);
	getAchievementsDetails(results.achievements.Summary);
	disableNavigationButtons(results);
}

window.searchResults = data.resume;
window.currItem = data.resume[0];
updateSearchResult(data.resume[0]);

var searchField = document.getElementById('searchbox');
searchField.addEventListener('keypress',function(event){
	if(event.key == "Enter"){
		document.querySelector('.resume').classList.remove('hidden');
		updateSearchResult(data.resume[0]);
	}
});