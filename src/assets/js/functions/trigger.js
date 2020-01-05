export default function triggerEvent(element, actionToTrigger){
	let evento = document.createEvent("HTMLEvents");
		evento.initEvent(actionToTrigger, true, true);
		element.dispatchEvent(evento);
}