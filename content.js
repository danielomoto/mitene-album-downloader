/**
 * This script downloads images from mitene.us until certain parameters are satisfied.
 */
const ID_END_IMAGE="end-image";
const ID_END_IMAGE_HELP="end-image-help";
const ID_END_IMAGE_HELP_DIV="end-image-help-div";
const ID_START_IMAGE="start-image";
const ID_START_IMAGE_HELP="start-image-help";
const ID_START_IMAGE_HELP_DIV="start-image-help-div";
const ID_MAX_RETRIES="max-retries";
const ID_MAX_RETRIES_HELP="max-retries-help";
const ID_MAX_RETRIES_HELP_DIV="max-retries-help-div";
const ID_MAX_PAGES_TO_PROCESS="max-pages-to-process";
const ID_MAX_PAGES_TO_PROCESS_HELP="max-pages-to-process-help";
const ID_MAX_PAGES_TO_PROCESS_HELP_DIV="max-pages-to-process-help-div";
const ID_MAX_IMAGES_TO_PROCESS="max-images-to-process";
const ID_MAX_IMAGES_TO_PROCESS_HELP="max-images-to-process-help";
const ID_MAX_IMAGES_TO_PROCESS_HELP_DIV="max-images-to-process-help-div";
const ID_UPDATE_START_END_IMAGE="update-start-end-image";
const ID_UPDATE_START_END_IMAGE_HELP="update-start-end-image-help";
const ID_UPDATE_START_END_IMAGE_HELP_DIV="update-start-end-image-help-div";
const ID_DOWNLOADED_IMAGES="downloaded-images";
const ID_DOWNLOADED_IMAGES_HELP="downloaded-images-help";
const ID_DOWNLOADED_IMAGES_HELP_DIV="downloaded-images-help-div";
const ID_LAST_PROCESSED_IMAGE="last-processed-image";
const ID_LAST_PROCESSED_IMAGE_HELP="last-processed-image-help";
const ID_LAST_PROCESSED_IMAGE_HELP_DIV="last-processed-image-help-div";
const ID_TOTAL_NUM_IMAGES_DOWNLOADED="total-num-of-images-downloaded";
const ID_TOTAL_NUM_IMAGES_DOWNLOADED_HELP="total-num-of-images-downloaded-help";
const ID_TOTAL_NUM_IMAGES_DOWNLOADED_HELP_DIV="total-num-of-images-downloaded-help-div";
const ID_MAX_NUM_OF_IDS_TO_SAVE_IN_HISTORY="max-num-ids-to-save-in-history";
const ID_MAX_NUM_OF_IDS_TO_SAVE_IN_HISTORY_HELP="max-num-ids-to-save-in-history-help";
const ID_MAX_NUM_OF_IDS_TO_SAVE_IN_HISTORY_HELP_DIV="max-num-ids-to-save-in-history-help-div";
const ID_MAX_NUM_OF_IDS_TO_SAVE_IN_LOG="max-num-ids-to-save-in-log";
const ID_MAX_NUM_OF_IDS_TO_SAVE_IN_LOG_HELP="max-num-ids-to-save-in-log-help";
const ID_MAX_NUM_OF_IDS_TO_SAVE_IN_LOG_HELP_DIV="max-num-ids-to-save-in-log-help-div";
const ID_RANDOM_SLEEP="random-sleep";
const ID_RANDOM_SLEEP_HELP="random-sleep-help";
const ID_RANDOM_SLEEP_HELP_DIV="random-sleep-help-div";
const ID_STATUS="status";
const ID_SHOW_WARNING_CLOSE="show-warning-close";
const ID_MAX_NUM_OF_DOWNLOADS_TO_LOOK_AT="max-num-of-downloads-to-look-at-chrome";
const ID_MAX_NUM_OF_DOWNLOADS_TO_LOOK_AT_HELP="max-num-of-downloads-to-look-at-chrome-help";
const ID_MAX_NUM_OF_DOWNLOADS_TO_LOOK_AT_HELP_DIV="max-num-of-downloads-to-look-at-chrome-help-div";
const ID_DO_NOT_FAIL_ON_DOWNLOAD_VERIFICATION="do-not-fail-on-download-verification";
const ID_DO_NOT_FAIL_ON_DOWNLOAD_VERIFICATION_HELP="do-not-fail-on-download-verification-help";
const ID_DO_NOT_FAIL_ON_DOWNLOAD_VERIFICATION_HELP_DIV="do-not-fail-on-download-verification-help-div";
const ID_URL_OF_LAST_PAGE="url-of-last-page";
const ID_URL_OF_LAST_PAGE_HELP="url-of-last-page-help";
const ID_URL_OF_LAST_PAGE_HELP_DIV="url-of-last-page-help-div";


const ID_PROPERTIES_DIV="properties-div";
const ID_DOWNLOADER_DIV="downloader-div";

const ID_CLOSE_BUTTON="close";
const ID_SAVE_BUTTON="save";
const ID_PROPERTIES_BUTTON="properties";
const ID_PAUSE_BUTTON="pause";
const ID_DOWNLOAD_BUTTON="download";

const ITEM_STATE_COMPLETE="complete";

const ERROR_TAB_URL="Tab URL does not contain mitene.us.  This extension only works on mitene.us sites.";
const ERROR_RANDOM_SLEEP_FORMAT="Random # of seconds to sleep between downloads must be 2 digits separated by hyphen (e.g. 5-10)";
const ERROR_NUMBER_FORMAT=(id) => `${id} must be a digit`;

const LOG_FOUND="Found";
const LOG_LOADED_ID_FROM_STORAGE=(name, value) => `Loaded ${name}: ${value}`;
const LOG_FILENAME_NOT_FOUND_YET=(file) => `Download history doesn't contain ${file} yet.`;
const LOG_FILENAME_NOT_DONE_YET=(file) => `${file} isn't done downloading yet.`;
const LOG_SEARCHING_FOR=(search) => `Searching downloads for ${search}.`;
const LOG_ALREADY_DOWNLOADED="Already downloaded, skipping.";
const LOG_INCREMENTING_LAST_NUM_OF_IMAGES="Incrementing last # of images processed.";
const LOG_UPDATING_LAST_PROCESSED_IMAGE="Updating last processed image.";
const LOG_UPDATING_HISTORY="Updating history.";
const LOG_UPDATING_LAST_URL="Updating last url.";
const LOG_FIRST_ENTRY_IN_HISTORY="Adding first entry into history.";
const LOG_POPPING_HISTORY="Popping history.";
const LOG_PUSHING_ID_INTO_HISTORY="Pushing id into history.";

const MSG_ADD_LOG="MSG_ADD_LOG";
const MSG_FIND_DOWNLOAD="MSG_FIND_DOWNLOAD";
const MSG_UPDATE_LAST_PROCESSED_IMAGE="MSG_UPDATE_LAST_PROCESSED_IMAGE";
const MSG_UPDATE_START_END_IMAGE="MSG_UPDATE_START_END_IMAGE";
const MSG_HIDE_WARNING="MSG_HIDE_WARNING";

const TAB_URL_SEARCH="mitene.us";
const TAB_URL="TAB_URL";

/**
 * Show properties and hide downloader when properties button is clicked.
 */
 document.getElementById(ID_PROPERTIES_BUTTON).addEventListener("click", () => {
	var properties = document.getElementById(ID_PROPERTIES_DIV);
	var downloader = document.getElementById(ID_DOWNLOADER_DIV);
	if (properties.style.display === "none") {
		properties.style.display = "block";
		downloader.style.display = "none";
	} else {
		properties.style.display = "none";
		downloader.style.display = "block";
	}
});

/**
 * Close properties and show downloader.
 */
function closeProperties() {
	var properties = document.getElementById(ID_PROPERTIES_DIV);
	properties.style.display = "none";
	var downloader = document.getElementById(ID_DOWNLOADER_DIV);
	downloader.style.display = "block";
}

/**
 * Close properties and show downloader when close button is pushed.
 */
document.getElementById(ID_CLOSE_BUTTON).addEventListener("click", () => {
	closeProperties();
});

/**
 * Returns all the input ids to save into storage from the popup.
 */
function getIdsToSave() {
	return [
		ID_LAST_PROCESSED_IMAGE,
		ID_TOTAL_NUM_IMAGES_DOWNLOADED,
		ID_END_IMAGE,
		ID_START_IMAGE,
		ID_MAX_RETRIES,
		ID_MAX_PAGES_TO_PROCESS,
		ID_MAX_IMAGES_TO_PROCESS,
		ID_UPDATE_START_END_IMAGE,
		ID_DOWNLOADED_IMAGES,
		ID_MAX_NUM_OF_IDS_TO_SAVE_IN_HISTORY,
		ID_RANDOM_SLEEP,
		ID_MAX_NUM_OF_IDS_TO_SAVE_IN_LOG,
		ID_STATUS,
		ID_DO_NOT_FAIL_ON_DOWNLOAD_VERIFICATION,
		ID_MAX_NUM_OF_DOWNLOADS_TO_LOOK_AT,
		ID_URL_OF_LAST_PAGE
	];
}

/**
 * Returns an object containing the input ids mapped to the input values.
 */
function getPopupData() {
	var data = {};
	// get all data in the popup
	var ids = getIdsToSave();
	for (var i = 0; i < ids.length; i++) {
		var id = ids[i]
		if(id == ID_URL_OF_LAST_PAGE) {
			data[ids[i]] = document.getElementById(id).innerHTML;
		} else if(id == ID_UPDATE_START_END_IMAGE || id == ID_DO_NOT_FAIL_ON_DOWNLOAD_VERIFICATION) {
			data[ids[i]] = document.getElementById(id).checked;
		} else {
			data[ids[i]] = document.getElementById(id).value;
		}
	}
	
	return data;
}	

/**
 * Save all the input values to storage when the save button is clicked.
 */
document.getElementById(ID_SAVE_BUTTON).addEventListener("click", () => {
	var data = getPopupData();
	chrome.storage.local.set(data);
	
	closeProperties();
});

/**
 * Load the popup UI.
 */
document.addEventListener("DOMContentLoaded", function () {
	var ids = getIdsToSave();
	// load every popup value from storage and update the UI
	chrome.storage.local.get(ids, function(result){
		if(result != null) {
			for (let i = 0; i < ids.length; i++) {
				var id = ids[i];
				if(result[id] != undefined) {
					if(id == ID_URL_OF_LAST_PAGE) {
						document.getElementById(id).innerHTML = result[id];
					} else if(id == ID_UPDATE_START_END_IMAGE || id == ID_DO_NOT_FAIL_ON_DOWNLOAD_VERIFICATION) {
						document.getElementById(id).checked = result[id];
					} else {
						document.getElementById(id).value = result[id];
					}
					
					console.log(LOG_LOADED_ID_FROM_STORAGE(id, result[id]));
				}
			}
		}
	});
})

/**
 * Verifies the popup data before processing the tab.
 */
function verifyData(data) {
	var mustBeInts = [
		ID_MAX_RETRIES,
		ID_MAX_PAGES_TO_PROCESS,
		ID_MAX_IMAGES_TO_PROCESS,
		ID_MAX_NUM_OF_IDS_TO_SAVE_IN_HISTORY,
		ID_MAX_NUM_OF_IDS_TO_SAVE_IN_LOG,
		ID_MAX_NUM_OF_DOWNLOADS_TO_LOOK_AT,
		ID_TOTAL_NUM_IMAGES_DOWNLOADED];
	for(var i = 0; i < mustBeInts.length; i++) {
		var digit = data[mustBeInts[i]].match(/^\d+$/g);
		if(!digit) {
			return ERROR_NUMBER_FORMAT(mustBeInts[i]);
		}
	}
	
	var randomSleep = data[ID_RANDOM_SLEEP];
	var match = data[ID_RANDOM_SLEEP].match(/\d+-\d+/g);
	if(!match) {
		return ERROR_RANDOM_SLEEP_FORMAT;
	}
	
	return null;
}

/**
 * Help divs.
 */
document.getElementById(ID_END_IMAGE_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_END_IMAGE_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_START_IMAGE_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_START_IMAGE_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_MAX_RETRIES_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_MAX_RETRIES_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_MAX_PAGES_TO_PROCESS_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_MAX_PAGES_TO_PROCESS_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_MAX_IMAGES_TO_PROCESS_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_MAX_IMAGES_TO_PROCESS_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_UPDATE_START_END_IMAGE_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_UPDATE_START_END_IMAGE_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_DOWNLOADED_IMAGES_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_DOWNLOADED_IMAGES_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_LAST_PROCESSED_IMAGE_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_LAST_PROCESSED_IMAGE_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_TOTAL_NUM_IMAGES_DOWNLOADED_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_TOTAL_NUM_IMAGES_DOWNLOADED_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_MAX_NUM_OF_IDS_TO_SAVE_IN_HISTORY_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_MAX_NUM_OF_IDS_TO_SAVE_IN_HISTORY_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_RANDOM_SLEEP_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_RANDOM_SLEEP_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_MAX_NUM_OF_IDS_TO_SAVE_IN_LOG_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_MAX_NUM_OF_IDS_TO_SAVE_IN_LOG_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_MAX_NUM_OF_DOWNLOADS_TO_LOOK_AT_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_MAX_NUM_OF_DOWNLOADS_TO_LOOK_AT_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_DO_NOT_FAIL_ON_DOWNLOAD_VERIFICATION_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_DO_NOT_FAIL_ON_DOWNLOAD_VERIFICATION_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});
document.getElementById(ID_URL_OF_LAST_PAGE_HELP).addEventListener("click", () => {
	var help = document.getElementById(ID_URL_OF_LAST_PAGE_HELP_DIV);
	console.log(help.style.display)
	if (help.style.display === "block") {
		help.style.display = "none";
	} else {
		help.style.display = "block";
	}
});

/**
 * Start downloading images when the download button is clicked in the popup.
 */
document.getElementById(ID_DOWNLOAD_BUTTON).addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
		if(!tab.url.includes(TAB_URL_SEARCH)) {
			console.log(ERROR_TAB_URL);
			alert(ERROR_TAB_URL);
			return;
		}
		
		var data = getPopupData();
		var error = verifyData(data);
		if(error != null) {
			console.log(error);
			alert(error);
			return;
		}
		
		data[TAB_URL] = tab.url;
		
		document.getElementById(ID_SHOW_WARNING_CLOSE).style.display = "block";
        async function downloadContent(
			data
		) {
			const ID_MEDIA_IMG="media-img";
			const ID_MEDIA_CONTAINER="media-container";
			const ID_MEDIA_THUMBNAIL_CONTAINER="media-thumbnail-container";
			const ID_NEXT_BUTTON="follower-paging-next-link";
			const ID_END_IMAGE="end-image";
			const ID_START_IMAGE="start-image";
			const ID_MAX_RETRIES="max-retries";
			const ID_MAX_PAGES_TO_PROCESS="max-pages-to-process";
			const ID_MAX_IMAGES_TO_PROCESS="max-images-to-process";
			const ID_UPDATE_START_END_IMAGE="update-start-end-image";
			const ID_DOWNLOADED_IMAGES="downloaded-images";
			const ID_LAST_PROCESSED_IMAGE="last-processed-image";
			const ID_TOTAL_NUM_IMAGES_DOWNLOADED="total-num-of-images-downloaded";
			const ID_MITENE_DOWNLOAD_BUTTON="download-button";
			const ID_RANDOM_SLEEP="random-sleep";
			const ID_DO_NOT_FAIL_ON_DOWNLOAD_VERIFICATION="do-not-fail-on-download-verification";
			const ID_MAX_NUM_OF_DOWNLOADS_TO_LOOK_AT="max-num-of-downloads-to-look-at-chrome";
			
			const MSG_ADD_LOG="MSG_ADD_LOG";
			const MSG_FIND_DOWNLOAD="MSG_FIND_DOWNLOAD";
			const MSG_UPDATE_LAST_PROCESSED_IMAGE="MSG_UPDATE_LAST_PROCESSED_IMAGE";
			const MSG_UPDATE_START_END_IMAGE="MSG_UPDATE_START_END_IMAGE";

			const LOG_START="---------- STARTING DOWNLOAD ----------";
			const LOG_SEARCHING_FOR=(search) => `Searching downloads for ${search}.`;
			const LOG_DOWNLOAD_NOT_COMPLETE="Download isn't complete, sleeping 2 seconds.";
			const LOG_DOWNLOADED=(id) => `Downloaded ${id}.`;
			const LOG_IDS_ARE_SAME="Ids are still the same, sleeping for 2 seconds.";
			const LOG_IDS_ARE_DIFFERENT="New set of ides found!";
			const LOG_FOUND_END_IMAGE="Found end image, terminating.";
			const LOG_CLICKING_THUMBNAIL=(id) => `Clicking thumbnail ${id}.`;
			const LOG_DOWNLOADING_TILL=(endImage) => `Downloading content till ${endImage}.`;
			const LOG_DOWNLOADING=(id) => `Downloading ${id}`;
			const LOG_IDS=(ids) => `Ids ${ids}`;
			const LOG_FOUND="Found.";
			const LOG_NOT_FOUND="Not found yet.";
			const LOG_WAITING_FOR_OVERLAY="Waiting for overlay.";
			const LOG_WAITING_FOR_NEW_THUMBNAILS="Waiting for new thumbnails.";
			const LOG_ALREADY_DOWNLOADED="Already downloaded, skipping.";
			const LOG_MAX_PAGES_REACHED="Max number of pages reached, terminating.";
			const LOG_MAX_IMAGES_REACHED="Max number of images reached, terminating.";
			const LOG_OVERLAYS_ARE_IDENTICAL="Overlay ids haven't changed yet, waiting.";
			const LOG_STARTING_OVERLAY=(overlay) => `Starting overlay: ${overlay.img} ${overlay.video}`;
			const LOG_CURRENT_OVERLAY=(overlay) => `Current overlay: ${overlay.img} ${overlay.video}`;
			const LOG_SKIPPING_PAGE="Starting image not found, skipping this page.";
			const LOG_STARTING_IMAGE_NOT_FOUND_YET="Starting image not found yet.";
			const LOG_SLEEPING_FOR=(sleep) => `Sleeping for ${sleep} seconds.`
			
			const WARNING_CANT_DOWNLOAD_ID=(id) => `WARNING: Can't verify ${id}, but continuing.`;
			
			const ERROR_CANT_FIND_MEDIA_CONTAINER=(id) => `ERROR: Can't find media-container containing ${id}.`;
			const ERROR_CANT_DOWNLOAD_ID=(id) => `ERROR: Can't download ${id}.`;
			const ERROR_CANT_GET_IDS="ERROR: Can't get a new set of image ids.";
			const ERROR_TOO_MANY_MEDIA_CONTAINERS="ERROR: Too many media containers.";
			const ERROR_POPUP_CLOSED="Popup window was closed or the active tab was changed.  If you want to do other stuff in chrome while the downloader is active, move it to a standalone window.";
			
			const TAB_URL="TAB_URL";
			
			/**
			 * Gets all the img ids from mitene.
			 */
			var getImageIds = function() {
				var ids = new Array();
				// Get all thumbnails
				var imgs = document.getElementsByClassName(ID_MEDIA_IMG);
				for (let i = 0; i < imgs.length; i++) {
					var src = imgs[i].currentSrc;
					var id = src.substring(src.indexOf("/small/") + 7, src.indexOf("?"));
					id = id.substring(0, id.lastIndexOf("."));
					ids.push(id);
				}
				
				return ids;
			}
			
			/**
			 * Returns the current overlay image id and video id.
			 */
			var getCurrentOverlayValue = function() {
				var containers2 = document.getElementsByClassName(ID_MEDIA_CONTAINER);
				// Hardcoding 0 as I"m assuming there won"t be 2 overlays/media-containers open.
				if(containers2.length == 0) {
					return { webp: "", video: "" };
				} else if(containers2.length > 1) {
					throw new Error(ERROR_TOO_MANY_MEDIA_CONTAINERS);
				} else {
					var videoRegex = /blob:https:\/\/mitene.us\/([\w-]*)/g;
					var imageRegex = /smartphone\/([\w-]*)/g;
					var video = containers2[0].innerHTML.match(videoRegex);
					var img = containers2[0].innerHTML.match(imageRegex);			
					return { img: img, video: video };
				}
			}
			
			/**
			 * Waits for the overlay to show up when you click a thumbnail in mitene.
			 */
			var waitForOverlay = async function(id, data, currentOverlay) {
				// Let"s wait a bit since we just clicked a thumbnail.
				console.log(LOG_WAITING_FOR_OVERLAY);
				await new Promise(r => setTimeout(r, 2000));
				
				// We"ll wait 20 seconds for the overlay to appear, but give up after that.
				var found = false;
				var search = id;
				
				for(var j = 0; j < data[ID_MAX_RETRIES] && !found; j++) {
					var overlayValue = getCurrentOverlayValue();
					console.log(LOG_CURRENT_OVERLAY(overlayValue));
					if(overlayValue == null) {
						console.log(LOG_NOT_FOUND);
						await new Promise(r => setTimeout(r, 2000));
					} else if(currentOverlay.img == overlayValue.img &&
							currentOverlay.video == overlayValue.video) {
						console.log(LOG_OVERLAYS_ARE_IDENTICAL);
						await new Promise(r => setTimeout(r, 2000));
					} else {
						console.log(LOG_FOUND);
						found = true;
					}
				}

				if(!found) {
					throw new Error(ERROR_CANT_FIND_MEDIA_CONTAINER(id));
				}
			}
			
			/**
			 * Waits for the download to show up in the download history.
			 */
			var waitForDownload = async function(id, data) {
				// Let"s wait a bit since we just clicked the download button.
				await new Promise(r => setTimeout(r, 2000));
			
				// We"ll wait 20 seconds for the image to appear in the downloads, but give up after that.
				var search = id;
				console.log(LOG_SEARCHING_FOR(search));
				var found = false;
				var numberOfDownloadsToLookAt = parseInt(data[ID_MAX_NUM_OF_DOWNLOADS_TO_LOOK_AT]);
				for(var j = 0; j < data[ID_MAX_RETRIES] && !found; j++) {
					var ret = await chrome.runtime.sendMessage({MSG_FIND_DOWNLOAD: { name: search, numberOfDownloadsToLookAt: numberOfDownloadsToLookAt }});
					found = ret.found;
				
					if(!found) {
						console.log(LOG_NOT_FOUND);
						await new Promise(r => setTimeout(r, 2000));
					} else {
						console.log(LOG_FOUND);
						break;
					}
				}
				
				if(found) {
					await chrome.runtime.sendMessage({MSG_ADD_LOG: LOG_DOWNLOADED(id)});
				} else {
					if(data[ID_DO_NOT_FAIL_ON_DOWNLOAD_VERIFICATION] == true) {
						await chrome.runtime.sendMessage({MSG_ADD_LOG: WARNING_CANT_DOWNLOAD_ID(id)});
					} else {
						throw new Error(ERROR_CANT_DOWNLOAD_ID(id));
					}
				}
			}
			
			/**
			 * Waits for a new set of thumbnails to appear when you click the next button.
			 */
			var waitForThumbnails = async function(ids, data) {
				// Let"s wait a bit since we just clicked the next button.
				console.log(LOG_WAITING_FOR_NEW_THUMBNAILS);
				await new Promise(r => setTimeout(r, 2000));
				
				// Let"s continue waiting 20 seconds for the new thumbnails to load, but give up after that.
				var error = true;
				for(var j = 0; j < data[ID_MAX_RETRIES]; j++) {
					var ids2 = getImageIds();
					if(ids.length === ids2.length && ids.every(function(value, index) { return value === ids2[index]})) {
						console.log(LOG_IDS_ARE_SAME);
						await new Promise(r => setTimeout(r, 2000));						
					} else {
						console.log(LOG_IDS_ARE_DIFFERENT);
						error = false;
						break;
					}
				}
				
				if(error) {
					throw new Error(ERROR_CANT_GET_IDS);
				}
			}
			
			/**
			 * Loops through all the thumbnails on mitene and clicks the download button.
			 */
			var processThumbnails = async function(ids, data, entries, numOfImages, startingImage) {
				var maxNumOfImages = parseInt(data[ID_MAX_IMAGES_TO_PROCESS]);
				// Click on each thumbnail and download the original image via the download button.
				var containers = document.getElementsByClassName(ID_MEDIA_THUMBNAIL_CONTAINER);

				var randomSleep = data[ID_RANDOM_SLEEP].split('-');
				var sleepFrom = parseInt(randomSleep[0]);
				var sleepTo = parseInt(randomSleep[1]);
				
				for (var i = 0; i < containers.length; i++) {
					var id = ids[i];
					if(data[ID_END_IMAGE] != "" && id == data[ID_END_IMAGE]) {
						console.log(LOG_FOUND_END_IMAGE);
						return;
					}
					
					if(startingImage != "") {
						if(id == startingImage) {
							startingImage = "";
						} else {
							console.log(LOG_STARTING_IMAGE_NOT_FOUND_YET);
							continue;
						}
					}
					
					if(entries.includes(id)) {
						console.log(LOG_ALREADY_DOWNLOADED);
						continue;
					}
					
					var overlayValue = getCurrentOverlayValue();
					console.log(LOG_STARTING_OVERLAY(overlayValue));
					console.log(LOG_CLICKING_THUMBNAIL(id));
					containers[i].click();
					
					await waitForOverlay(id, data, overlayValue);
					
					// Click the download button.
					console.log(LOG_DOWNLOADING(id));
					var downloadButton = document.getElementsByClassName(ID_MITENE_DOWNLOAD_BUTTON);
					downloadButton[0].click();
					
					await waitForDownload(id, data);
				
					await chrome.runtime.sendMessage({MSG_UPDATE_LAST_PROCESSED_IMAGE: { id: id, numOfThumbnailsPerPage: ids.length, url: data[TAB_URL] }});
					
					numOfImages++;
					if(numOfImages > maxNumOfImages && maxNumOfImages != 0) {
						console.log(LOG_MAX_IMAGES_REACHED);
						break;
					}
					
					if(randomSleep != 0) {
						var sleep = Math.floor(Math.random() * sleepTo) + sleepFrom;
						console.log(LOG_SLEEPING_FOR(sleep));
						await new Promise(r => setTimeout(r, sleep * 1000));
					}
				}
			}
			
			/**
			 * Determines the number of images processed this iteration.
			 */
			var getNumOfImagesProcessed = function(ids, startingImage, endingImage) {
				var numOfImages = 0;
				for(var i = 0; i < ids.length; i++) {
					if(ids[i] == endingImage) {
						break;
					} else if(startingImage == "") {
						numOfImages++;
					} else if(ids[i] == startingImage) {
						numOfImages++;
						startingImage = "";
					}
				}
				
				return numOfImages;
			}
			
			/**
			 * Main loop for downloader.
			 */
			var mainLoop = async function(data) {
				console.log(LOG_START);
				await chrome.runtime.sendMessage({MSG_ADD_LOG: LOG_START});
				var entries = data[ID_DOWNLOADED_IMAGES].split('\n');
				// Start downloading till we find the end image.
				var endingImage = data[ID_END_IMAGE];
				console.log(LOG_DOWNLOADING_TILL(endingImage));
				// Reset history
				await chrome.runtime.sendMessage({MSG_UPDATE_LAST_PROCESSED_IMAGE: { id: " " }});
				var firstImage;
				var numOfPages = 0;
				var numOfImages = 0;
				var maxNumOfPages = parseInt(data[ID_MAX_PAGES_TO_PROCESS]);
				var maxNumOfImages = parseInt(data[ID_MAX_IMAGES_TO_PROCESS]);
				var startingImage = data[ID_START_IMAGE];
				while(true)  {
					var ids = getImageIds();
					console.log(LOG_IDS(ids));
					
					// We"ll stop at this image the next time around, so save it.
					if(!firstImage) {
						firstImage = ids[0];
					}
					
					if(startingImage != "") {
						if(ids.includes(startingImage)) {
							await processThumbnails(ids, data, entries, numOfImages, startingImage);
							startingImage = "";
							numOfImages += getNumOfImagesProcessed(ids, startingImage, endingImage);
							// We need to reset the start image or the next run will skip a bunch of things.
							if(data[ID_UPDATE_START_END_IMAGE] == true) {
								await chrome.runtime.sendMessage({MSG_UPDATE_START_END_IMAGE: { startImage: "" }});
							}
						} else {
							console.log(LOG_SKIPPING_PAGE);
						}
					} else {
						await processThumbnails(ids, data, entries, numOfImages, startingImage);
						numOfImages += getNumOfImagesProcessed(ids, startingImage, endingImage);
					}
					
					// Stop if we're done.
					if(endingImage != "" && ids.includes(endingImage)) {
						console.log(LOG_FOUND_END_IMAGE);
						break;
					}
					
					if(startingImage == "") {
						// Have we reached the max number of pages or images?
						numOfPages++;
						if(numOfPages > maxNumOfPages && maxNumOfPages != 0) {
							console.log(LOG_MAX_PAGES_REACHED);
							break;
						}
						
						if(numOfImages > maxNumOfImages && maxNumOfImages != 0) {
							console.log(LOG_MAX_IMAGES_REACHED);
							break;
						}
					}
					
					// Click the next button.
					var links = document.getElementsByClassName(ID_NEXT_BUTTON);
					links[0].click();
					
					await waitForThumbnails(ids, data);
				}
				
				// Only update the last spot when there"s no error.
				// We may want to retry the downloads.
				if(data[ID_UPDATE_START_END_IMAGE] == true) {
					await chrome.runtime.sendMessage({MSG_UPDATE_START_END_IMAGE: { endImage: firstImage }});
				}
			}
			
			try {
				await mainLoop(data);
			} catch(error) {
				if(error.message.includes("Could not establish connection")) {
					console.log(ERROR_POPUP_CLOSED);
				} else {
					console.log(error.message);
					await chrome.runtime.sendMessage({MSG_ADD_LOG: error.message});
				}
			}
			
			await chrome.runtime.sendMessage({MSG_HIDE_WARNING: true});
        };

		// Inject the function into the mitene tab so we can process the DOM.
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: downloadContent,
			args: [data]
        });
    });
});

/**
 * Updates the storage of any input id passed in the request.
 */
function updateStorage(data) {
	var obj = Object.fromEntries(data);
	for(var i = 0; i < data.length; i++) {
		chrome.storage.local.set(obj);
		if(data[i][0] == ID_URL_OF_LAST_PAGE) {
			document.getElementById(data[i][0]).innerHTML = data[i][1];
		} else {
			document.getElementById(data[i][0]).value = data[i][1];
		}
	}
}

/**
 * Searches the download history to see whether the image was downloaded or not.
 */
function searchInDownloads(findDownload, sendResponse, numberOfDownloadsToLookAt) {
	// Loop through the downloads and check the last one downloaded.
	// I"m assuming they won"t be downloading other stuff at the same time.
	console.log(LOG_SEARCHING_FOR(findDownload));
	chrome.downloads.search({limit: numberOfDownloadsToLookAt}).then((data) => {
		var found = false;
		var done = false;
		for(var k = 0; k < data.length; k++) {
			var item = data[k];
			// See if the filename is there and the state is complete.
			if(item.filename.includes(findDownload)) {
				found = true;
				if(item.state == ITEM_STATE_COMPLETE) {
					done = true;
					break;
				}
			}
		}
		
		if(done) {
			console.log(LOG_FOUND);
		} else if(found) {
			console.log(LOG_FILENAME_NOT_DONE_YET(findDownload));
		} else {
			console.log(LOG_FILENAME_NOT_FOUND_YET(findDownload));
		}
	
		sendResponse({ found: done });
	});
}

/**
 * Adds an Image ID to the end of the download history as long as it's unique.
 */
function updateDownloadHistory(lastProcessedImage) {
	console.log(LOG_UPDATING_HISTORY);
	var downloadHistory = document.getElementById(ID_DOWNLOADED_IMAGES).value;
	var maxHistoryCount = parseInt(document.getElementById(ID_MAX_NUM_OF_IDS_TO_SAVE_IN_HISTORY).value);
	if(maxHistoryCount == 0) {
		return;
	}
	
	// Convert string into array.
	var entries = downloadHistory.split('\n');
	// Have we already downloaded the image?
	if(entries.includes(lastProcessedImage)) {
		console.log(LOG_ALREADY_DOWNLOADED);
		return;
	}
	
	// If we're over the limit, pop the array.
	if(entries.length >= maxHistoryCount) {
		console.log(LOG_POPPING_HISTORY);
		entries.pop();
		downloadHistory = entries.join("\n");
	}
	
	// Push the image id onto the array.
	if(downloadHistory != "") {
		console.log(LOG_PUSHING_ID_INTO_HISTORY);
		downloadHistory = lastProcessedImage + "\n" + downloadHistory;
	} else {
		console.log(LOG_FIRST_ENTRY_IN_HISTORY);
		downloadHistory = lastProcessedImage;
	}
	
	updateStorage([[ID_DOWNLOADED_IMAGES, downloadHistory]]);
}

/**
 * Update the url to skip to if chrome crashes.
 */
function updateLastUrl(numOfImages, lastProcessedImage) {
	console.log(LOG_UPDATING_LAST_URL);
	var page = Math.floor(numOfImages / lastProcessedImage.numOfThumbnailsPerPage);
	var components = lastProcessedImage.url.split('?');
	var url = components[0];
	if(page > 0) {
		url += "?page=" + page;
	}
	
	url = "<a href='" + url + "' target='_blank'>" + url + "</a>";
	updateStorage([[ID_URL_OF_LAST_PAGE, url]]);
}

/**
 * Increments the number of images processed by 1.
 */
function updateNumofImagesProcessed(lastProcessedImage) {
	console.log(LOG_INCREMENTING_LAST_NUM_OF_IMAGES);
	var numOfImages = parseInt(document.getElementById(ID_TOTAL_NUM_IMAGES_DOWNLOADED).value);
	numOfImages++;
	updateStorage([[ID_TOTAL_NUM_IMAGES_DOWNLOADED, numOfImages.toString()]]);
	
	updateLastUrl(numOfImages, lastProcessedImage);
}

/**
 * Perform special logic based on whether last procssed image is being updated or not.
 */
function updateLastProcessedImage(lastProcessedImage) {
	console.log(LOG_UPDATING_LAST_PROCESSED_IMAGE);
	// If we're not resetting the id, we need to update the history, url, and total download #.
	if(lastProcessedImage.id != " ") {
		updateDownloadHistory(lastProcessedImage.id);
		updateNumofImagesProcessed(lastProcessedImage);
	}
	
	updateStorage([[ID_LAST_PROCESSED_IMAGE, lastProcessedImage.id]]);
}

/**
 * Pushes a line to the log.
 */
function updateLog(line) {
	var log = document.getElementById(ID_STATUS).value;
	var maxLogCount = parseInt(document.getElementById(ID_MAX_NUM_OF_IDS_TO_SAVE_IN_LOG).value);
	if(maxLogCount == 0) {
		return;
	}
	
	// Convert string into array.
	var entries = log.split('\n');
	
	// If we're over the limit, pop the array.
	if(entries.length >= maxLogCount) {
		entries.pop();
		log = entries.join("\n");
	}
	
	// Push the line onto the array.
	if(log != "") {
		log = line + "\n" + log;
	} else {
		log = line;
	}
	
	updateStorage([[ID_STATUS, log]]);
}

/**
 * Listen to messages from the content script and respond accordingly.
 */
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var addLog = request[MSG_ADD_LOG];
		if (addLog) {
			// Output something to the status textarea.
			updateLog(addLog);
			return;
		}
		
		var findDownload = request[MSG_FIND_DOWNLOAD];
		if(findDownload) {
			searchInDownloads(findDownload.name, sendResponse, findDownload.numberOfDownloadsToLookAt);
		
			// We"ll send the response later, so return true.
			return true;
		}
		
		var lastProcessedImage = request[MSG_UPDATE_LAST_PROCESSED_IMAGE];
		if(lastProcessedImage) {
			updateLastProcessedImage(lastProcessedImage);
			return;
		}
		
		var updateStartEnd = request[MSG_UPDATE_START_END_IMAGE];
		if(updateStartEnd) {
			if(updateStartEnd.endImage != null) {
				updateStorage([[ID_END_IMAGE, updateStartEnd.endImage]]);
			}
			
			if(updateStartEnd.startImage != null) {
				updateStorage([[ID_START_IMAGE, updateStartEnd.startImage]]);
			}
			
			return;
		}
		
		var hideWarning = request[MSG_HIDE_WARNING];
		if(hideWarning) {
			document.getElementById(ID_SHOW_WARNING_CLOSE).style.display = "none";
		}
	}
);