package org.hitham.HITHAM.model;

public class PlayListModel {
	//private int playlist_id;
	private String playlist_name;
	private String teacher_pk;
	private String playlist_color;
	private String playlist_pic_url;
	
	public String getPlaylist_name() {
		return playlist_name;
	}
	public void setPlaylist_name(String playlist_name) {
		this.playlist_name = playlist_name;
	}
	public String getTeacher_pk() {
		return teacher_pk;
	}
	public void setTeacher_pk(String teacher_pk) {
		this.teacher_pk = teacher_pk;
	}
	public String getPlaylist_color() {
		return playlist_color;
	}
	public void setPlaylist_color(String playlist_color) {
		this.playlist_color = playlist_color;
	}
	public String getPlaylist_pic_url() {
		return playlist_pic_url;
	}
	public void setPlaylist_pic_url(String playlist_pic_url) {
		this.playlist_pic_url = playlist_pic_url;
	}

}
