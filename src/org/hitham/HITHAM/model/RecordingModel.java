package org.hitham.HITHAM.model;

public class RecordingModel {
 private String recording_id;
 private String song_id;
 private String recording_name;
 private String recording_pic_url;
 private String recording_color;
public String getRecording_name() {
	return recording_name;
}
public void setRecording_name(String recording_name) {
	this.recording_name = recording_name;
}
public String getRecording_color() {
	return recording_color;
}
public void setRecording_color(String recording_color) {
	this.recording_color = recording_color;
}
public String getRecording_id() {
	return recording_id;
}
public void setRecording_id(String recording_id) {
	this.recording_id = recording_id;
}
public String getSong_id() {
	return song_id;
}
public void setSong_id(String song_id) {
	this.song_id = song_id;
}
public String getRecording_pic_url() {
	return recording_pic_url;
}
public void setRecording_pic_url(String recording_pic_url) {
	this.recording_pic_url = recording_pic_url;
} 
}
