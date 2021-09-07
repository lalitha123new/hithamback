// this file consists of services related to  teacher
package org.hitham.HITHAM.resource;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.hitham.HITHAM.database.DatabaseConnection;
import org.hitham.HITHAM.model.PlayListModel;
import org.hitham.HITHAM.model.RecordingModel;
import org.hitham.HITHAM.model.SongModel;
import org.hitham.HITHAM.model.PathModel;
import org.hitham.HITHAM.service.PlaylistService;
import org.hitham.HITHAM.service.StudentService;
import org.json.JSONArray;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;





@Path("upload2")
public class MultiResource {
	@Context
	private ServletContext context;
	
	
	//Path ph=new Path();
	
	@POST  
    @Path("/upload21")  
	@Consumes(MediaType.MULTIPART_FORM_DATA)  
    public Response uploadFile(  
            @FormDataParam("file") InputStream uploadedInputStream,  
            @FormDataParam("file") FormDataContentDisposition fileDetail,
            @FormDataParam("playlist_name") String playlist_name,
            @FormDataParam("playlist_pic_url") String playlist_pic_url,
            @FormDataParam("playlist_color") String playlist_color,
            @FormDataParam("teacher_pk") String teacher_pk) throws SQLException, IOException { 
		
		String imge_path= PathModel.IMG_PATH;
		String filePath = context.getRealPath("images/"); 
		String sRootPath = new File("images/").getAbsolutePath();
		System.out.println("path-1-- "+sRootPath);
		//File file1 = new File(filePath);
		
		    // getPath();
		
		  //variables
		  String fileLocation ="";
		 
		    File file = new File("C:/Users/EHRC/Desktop/imgUpload/deleted1111.jpg");
	        if(file.delete()){
	            System.out.println("C:/Users/EHRC/Desktop/imgUpload/deleted1111.jpg File deleted");
	        }else System.out.println("C:/Users/EHRC/Desktop/imgUpload/deleted1111.jpg doesn't exist"); 
           
		  
          //String img_url="https://drive.google.com/uc?export=download&id=0BwtDpsO0CtJZbm9iNUNMTXNTX0k";
           String img_url = playlist_pic_url;
          // System.out.println("google drive upload");
    	   DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
   		   Date date = new Date();
           
           if(img_url.equals("")) {
        	   
        	   String ext2 = getFileExtension(fileDetail); // returns "exe"
              //fileLocation = "C:/Users/EHRC/Desktop/imgUpload/" +playlist_name+"_"+dateFormat.format(date)+"."+ext2; 
        	   //http://localhost:8080/hitham/
        	   fileLocation = filePath +"/"+playlist_name+"_"+dateFormat.format(date)+"."+ext2; 
        	  // fileLocation = "http://localhost:8080/hitham/images/"+playlist_name+"_"+dateFormat.format(date)+"."+ext2; 
        	   
        	  // fileLocation.substring(fileLocation.lastIndexOf(' ') + 1);
        	
        	   
        	   System.out.println("direct upload from local disk  "+imge_path+""+fileLocation.substring(fileLocation.lastIndexOf('/') + 1)+"--");
        	   try {  
                   FileOutputStream out = new FileOutputStream(new File(fileLocation));  
                   int read = 0;  
                   byte[] bytes = new byte[1024];  
                   out = new FileOutputStream(new File(fileLocation));  
                   while ((read = uploadedInputStream.read(bytes)) != -1) {  
                       out.write(bytes, 0, read);  
                   }  
                   out.flush();  
                   out.close();  
               } catch (IOException e) {e.printStackTrace();}  
        	   
        	   
           }else {
        	   System.out.println("google drive upload--"+img_url);
        	   fileLocation = saveImage(img_url,playlist_name,0,dateFormat.format(date));
           }
           
           
           
           String Img_new_path = imge_path+""+fileLocation.substring(fileLocation.lastIndexOf('/') + 1);
          
           //saving file 
           PlayListModel pm=new PlayListModel();
           pm.setPlaylist_name(playlist_name);
           pm.setPlaylist_color(playlist_color);
           pm.setPlaylist_pic_url(Img_new_path);
           pm.setTeacher_pk(teacher_pk);
           
           System.out.println(teacher_pk);
           
            PlaylistService pls = new PlaylistService(); 
			int rvalue = pls.createPlaylist(pm);
           
            
            String output = "File successfully uploaded to : " + fileLocation;  
            return Response.status(200).entity(output).build();  
        }  
	
	
	//recording Method
	@POST  
    @Path("/uploadRecording")  
	@Consumes(MediaType.MULTIPART_FORM_DATA)  
    public Response uploadRecording(  
            @FormDataParam("file") InputStream uploadedInputStream,  
            @FormDataParam("file") FormDataContentDisposition fileDetail,
            @FormDataParam("recordingName") String recordingName,
            @FormDataParam("recordingColor1") String recordingColor1,
            @FormDataParam("recordingPicURL1") String recordingPicURL1,
            @FormDataParam("song_id") String song_id1) throws SQLException, IOException { 
		
		
		  String imge_path= PathModel.IMG_PATH;
		  String filePath = context.getRealPath("images/"); 
		  String sRootPath = new File("images/").getAbsolutePath();
		
		  //variables
		  String fileLocation ="";
		 
		   
		 
           
          //String img_url="https://drive.google.com/uc?export=download&id=0BwtDpsO0CtJZbm9iNUNMTXNTX0k";
           String img_url = recordingPicURL1;
           System.out.println("google drive upload");
    	   DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
   		   Date date = new Date();
           
           if(img_url.equals("")) {
        	   System.out.println("direct upload from local disk");
        	   String ext2 = getFileExtension(fileDetail); // returns "exe"
               fileLocation = filePath +"/"+recordingName+"_"+dateFormat.format(date)+"."+ext2; 
        	   
        	   try {  
                   FileOutputStream out = new FileOutputStream(new File(fileLocation));  
                   int read = 0;  
                   byte[] bytes = new byte[1024];  
                   out = new FileOutputStream(new File(fileLocation));  
                   while ((read = uploadedInputStream.read(bytes)) != -1) {  
                       out.write(bytes, 0, read);  
                   }  
                   out.flush();  
                   out.close();  
               } catch (IOException e) {e.printStackTrace();}  
        	   
        	   
           }else {
        	 
       		   System.out.println("date is working---"+dateFormat.format(date)); //2016/11/16 12:08:43
        	   
        	   fileLocation = saveImage(img_url,recordingName,1,dateFormat.format(date));
           }
           
           
           String Img_new_path = imge_path+""+fileLocation.substring(fileLocation.lastIndexOf('/') + 1);
           
          
           DatabaseConnection dbconn = new DatabaseConnection();
   		if(! dbconn.isStatus()){
   			dbconn.closeAll();
   			return Response.status(210).entity("DBError").build();
   		}
   		String recording_name = recordingName;
   		String recording_pic_url = Img_new_path;
   		String recording_color = recordingColor1;
   		String song_id = song_id1;
   		
   		//recording_pic_url = recording_pic_url.replace("open?","uc?export=download&");
   		//recording_pic_url = recording_pic_url.replace("file/d/","uc?export=download&id=");
   		//recording_pic_url = recording_pic_url.replace("/view?usp=drivesdk",""); 
   		//recording_pic_url = fileLocation;
   		String query = "insert into recording (recording_name,recording_pic_url,recording_color,song_id) values ('"+recording_name+"','"+recording_pic_url+"','"+recording_color+"','"+song_id+"')";
   		dbconn.getStmt().executeUpdate(query);
   		dbconn.closeAll();
   		return Response.status(201).entity("success").build();
        }  
	
	
	
	//edit playlist
	/*
	 *  Update the existing playlist
	 */
	
	@POST 
	@Path("/edit1PL")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response update(@FormDataParam("file") InputStream uploadedInputStream,  
            @FormDataParam("file") FormDataContentDisposition fileDetail,
            @FormDataParam("playlist_name") String playlist_name,
            @FormDataParam("playlist_pic_url") String playlist_pic_url,
            @FormDataParam("playlist_color") String playlist_color,
            @FormDataParam("playlist_id") String playlist_id
            ) throws SQLException, IOException { 
		//https://drive.google.com/uc?export=download&id=0BwtDpsO0CtJZbm9iNUNMTXNTX0k
		
		String imge_path= PathModel.IMG_PATH;
		String filePath = context.getRealPath("images/"); 
		String sRootPath = new File("images/").getAbsolutePath();
		System.out.println("path-1-- "+playlist_pic_url);
		
		String newStr="";
		
		if( !playlist_pic_url.equals("")) {
			String str1=playlist_pic_url;
			String str= new String(str1);
			newStr=str.substring(0,8);
		}
		
		
		
		//System.out.println(uploadedInputStream);
		  //variables
		  String fileLocation ="";
		 
		    File file = new File("C:/Users/EHRC/Desktop/imgUpload/deleted1111.jpg");
	        if(file.delete()){
	            System.out.println("C:/Users/EHRC/Desktop/imgUpload/deleted1111.jpg File deleted");
	        }else { 
	        	System.out.println("C:/Users/EHRC/Desktop/imgUpload/deleted1111.jpg doesn't exist");
	        	}
           
		  
          //String img_url="https://drive.google.com/uc?export=download&id=0BwtDpsO0CtJZbm9iNUNMTXNTX0k";
           String img_url = playlist_pic_url;
           System.out.println("google drive upload");
    	   DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
   		   Date date = new Date();
   		   
   		   
   		   System.out.println("substring--"+fileDetail.getFileName());
   		   
           if(img_url.equals("") || fileDetail.getFileName() != null) {
        	   
        	  String ext2 = getFileExtension(fileDetail); // returns "exe"
               fileLocation = filePath+"/"+playlist_name+"_"+dateFormat.format(date)+"."+ext2; 
               System.out.println("direct upload from local disk--"+fileLocation);
        	   try {  
                   FileOutputStream out = new FileOutputStream(new File(fileLocation));  
                   int read = 0;  
                   byte[] bytes = new byte[1024];  
                   out = new FileOutputStream(new File(fileLocation));  
                   while ((read = uploadedInputStream.read(bytes)) != -1) {  
                       out.write(bytes, 0, read);  
                   }  
                   out.flush();  
                   out.close();  
               } catch (IOException e) {e.printStackTrace();}  
        	   
        	   
           }else if(newStr.equals("https://") &&  fileDetail.getFileName() == null ) {
        	  
        	   fileLocation = saveImage(img_url,playlist_name,0,dateFormat.format(date));
        	   System.out.println("google drive upload---"+fileLocation);
           }else {
        	   
        	  
        	   fileLocation=playlist_pic_url;
        	   System.out.println("they did't upload  "+fileLocation); 
        	   
           }
           
           System.out.println("beforeSplit----"+fileLocation);
           
           System.out.println("beforeSave----"+fileLocation.substring(fileLocation.lastIndexOf('/') + 1));
           
           String Img_new_path = imge_path+""+fileLocation.substring(fileLocation.lastIndexOf('/') + 1);
           
           PlaylistService pls = new PlaylistService(); 
           PlayListModel pm=new PlayListModel();
           pm.setPlaylist_name(playlist_name);
           pm.setPlaylist_color(playlist_color);
           pm.setPlaylist_pic_url(Img_new_path);
		   int returnvalue = pls.update(pm,playlist_id);
          
            
            String output = "File successfully uploaded to : " + fileLocation;  
            return Response.status(200).entity(output).build();  
	}
	
	//updateRecording 
	@POST 
	@Path("/editRecording")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response updateRecording(@FormDataParam("file") InputStream uploadedInputStream,  
            @FormDataParam("file") FormDataContentDisposition fileDetail,
            @FormDataParam("recording_name") String recording_name,
            @FormDataParam("recording_pic_url") String recording_pic_url,
            @FormDataParam("recording_color") String recording_color,
            @FormDataParam("recordingID") String recordingID,
            @FormDataParam("song_id") String song_id
            ) throws SQLException, IOException { 
		//https://drive.google.com/uc?export=download&id=0BwtDpsO0CtJZbm9iNUNMTXNTX0k
		
		String imge_path= PathModel.IMG_PATH;
		String filePath = context.getRealPath("images/"); 
		String sRootPath = new File("images/").getAbsolutePath();
		System.out.println("path-1-- "+recording_pic_url);
		
		String newStr="";
		
		if( !recording_pic_url.equals("")) {
			String str1=recording_pic_url;
			String str= new String(str1);
			newStr=str.substring(0,8);
		}
		
		  
		
		
		
		   //System.out.println(uploadedInputStream);
		  //variables
		  String fileLocation ="";
		 
		    File file = new File("C:/Users/EHRC/Desktop/imgUpload/deleted1111.jpg");
	        if(file.delete()){
	            System.out.println("C:/Users/EHRC/Desktop/imgUpload/deleted1111.jpg File deleted");
	        }else { 
	        	System.out.println("C:/Users/EHRC/Desktop/imgUpload/deleted1111.jpg doesn't exist");
	        }
           
		  
          //String img_url="https://drive.google.com/uc?export=download&id=0BwtDpsO0CtJZbm9iNUNMTXNTX0k";
           String img_url = recording_pic_url;
         //  System.out.println("google drive upload-2"+fileDetail.getFileName().equals("null") );
    	   DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
   		   Date date = new Date();
   		   
   		   
   		   System.out.println("substring--"+fileDetail.getFileName());
   		   
           if(img_url.equals("") || fileDetail.getFileName() != null) {
        	   System.out.println("direct upload from local disk");
        	  String ext2 = getFileExtension(fileDetail); // returns "exe"
               fileLocation = filePath+"/"+recording_name+"_"+dateFormat.format(date)+"."+ext2; 
        	   
        	   try {  
                   FileOutputStream out = new FileOutputStream(new File(fileLocation));  
                   int read = 0;  
                   byte[] bytes = new byte[1024];  
                   out = new FileOutputStream(new File(fileLocation));  
                   while ((read = uploadedInputStream.read(bytes)) != -1) {  
                       out.write(bytes, 0, read);  
                   }  
                   out.flush();  
                   out.close();  
               } catch (IOException e) {e.printStackTrace();}  
        	   
        	   
           }else if(newStr.equals("https://") && fileDetail.getFileName() == null ) {
        	   System.out.println("google drive upload-1"+img_url);
        	   fileLocation = saveImage(img_url,recording_name,0,dateFormat.format(date));
           }else {
        	   
        	   System.out.println("they did't upload"); 
        	   fileLocation = recording_pic_url;
        	   
           }
           
           
           String Img_new_path = imge_path+""+fileLocation.substring(fileLocation.lastIndexOf('/') + 1);
           
		   
		   
		   DatabaseConnection dbconn = new DatabaseConnection();
			if(! dbconn.isStatus()){
				dbconn.closeAll();
				return Response.status(210).entity("DBError").build();
			}
			
			recording_pic_url = recording_pic_url.replace("open?","uc?export=download&");
			recording_pic_url = recording_pic_url.replace("file/d/","uc?export=download&id=");
			recording_pic_url = recording_pic_url.replace("/view?usp=drivesdk","");
			String query = "update recording set song_id = '"+song_id+"', recording_name = '"+recording_name+"', recording_pic_url='"+Img_new_path+"', recording_color = '"+recording_color+"'  where recording_id = "+recordingID;
			//System.out.println(query);
			dbconn.getStmt().executeUpdate(query);
			dbconn.closeAll();
			return Response.status(201).entity("success").build();
		   
		   
          
            
           // String output = "File successfully uploaded to : " + fileLocation;  
           // return Response.status(200).entity(output).build();  
	}
	
	
	
	//upload mp3
	@POST  
    @Path("/uploadmp3")  
	@Consumes(MediaType.MULTIPART_FORM_DATA)  
    public Response uploadMp3File(  
            @FormDataParam("file") InputStream uploadedInputStream,  
            @FormDataParam("file") FormDataContentDisposition fileDetail,
            @FormDataParam("song_name") String song_name,
            @FormDataParam("song_raaga") String song_raaga,
            @FormDataParam("song_taal") String song_taal,
            @FormDataParam("song_singer") String song_singer,
            @FormDataParam("song_composer") String song_composer,
            @FormDataParam("song_url") String song_url) throws SQLException, IOException { 
		
		System.out.println("its working MP3");
		
		
		String imge_path= PathModel.IMG_PATH;
		String filePath = context.getRealPath("images/"); 
		String sRootPath = new File("images/").getAbsolutePath();
		System.out.println("path-1-- "+song_url);
		
		String newStr="";
		
		if( !song_url.equals("")) {
			String str1=song_url;
			String str= new String(str1);
			newStr=str.substring(0,8);
		}
		
		
		
		  //variables
		  String fileLocation ="";
		 
		    File file = new File("C:/Users/EHRC/Desktop/imgUpload/deleted1111.jpg");
	        if(file.delete()){
	            System.out.println("C:/Users/EHRC/Desktop/imgUpload/deleted1111.jpg File deleted");
	        }else System.out.println("C:/Users/EHRC/Desktop/imgUpload/deleted1111.jpg doesn't exist"); 
           
		  
          //String img_url="https://drive.google.com/uc?export=download&id=0BwtDpsO0CtJZbm9iNUNMTXNTX0k";
           String img_url = song_url;
           
           System.out.println("google drive upload");
    	   DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
   		   Date date = new Date();
           
           if(img_url.equals("")) {
        	   System.out.println("direct upload from local disk");
        	   String ext2 = getFileExtension(fileDetail); // returns "exe"
               //fileLocation = filePath+"/"+"C:/Users/EHRC/Desktop/imgUpload/"+dateFormat.format(date)+"."+ext2; 
              
               fileLocation = filePath+"/"+song_name+"_"+dateFormat.format(date)+"."+ext2;
        	   
        	   try {  
                   FileOutputStream out = new FileOutputStream(new File(fileLocation));  
                   int read = 0;  
                   byte[] bytes = new byte[1024];  
                   out = new FileOutputStream(new File(fileLocation));  
                   while ((read = uploadedInputStream.read(bytes)) != -1) {  
                       out.write(bytes, 0, read);  
                   }  
                   out.flush();  
                   out.close();  
               } catch (IOException e) {e.printStackTrace();}  
        	   
        	   
           }else if(newStr.equals("https://") && fileDetail.getFileName() == null ) {
        	   System.out.println("google drive upload");
        	   fileLocation = saveImage(img_url,song_name,1,dateFormat.format(date));
           }
           
           
           DatabaseConnection dbconn = new DatabaseConnection();
   		if(! dbconn.isStatus()){
   			dbconn.closeAll();
   			return Response.status(210).entity("DBError").build();
   		}
           
          
           //saving file 
//           SongModel slm=new SongModel();
//           slm.setSong_name(song_name);
//           slm.setSong_url(fileLocation);
//   		   slm.setSong_raaga(song_raaga);
//   		   slm.setSong_taal(song_taal);
//   		   slm.setSong_singer(song_singer);
//   		   slm.setSong_composer(song_composer);
   		//System.out.println(fileLocation);   
   		   
   		String Img_new_path = imge_path+""+fileLocation.substring(fileLocation.lastIndexOf('/') + 1);
   		
   		song_url = song_url.replace("open?","uc?export=download&");
		song_url = song_url.replace("file/d/","uc?export=download&id=");
		song_url = song_url.replace("/view?usp=drivesdk","");
		String query = "insert into song (song_name,song_url,song_raaga,song_taal,song_singer,song_composer) values ('"+song_name+"','"+Img_new_path+"','"+song_raaga+"','"+song_taal+"','"+song_singer+"','"+song_composer+"')";
		
		dbconn.getStmt().executeUpdate(query);
		dbconn.closeAll();
           
           
            
            String output = "File successfully uploaded to : " + fileLocation;  
            return Response.status(200).entity(output).build();  
        }  
	
	
	   //upload mp3
		@POST  
	    @Path("/editMp3File/{songID1}")  
		@Consumes(MediaType.MULTIPART_FORM_DATA)  
	    public Response editMp3File( 
	    		@PathParam("songID1") String song_id,
	            @FormDataParam("file") InputStream uploadedInputStream,  
	            @FormDataParam("file") FormDataContentDisposition fileDetail,
	            @FormDataParam("song_name") String song_name,
	            @FormDataParam("song_raaga") String song_raaga,
	            @FormDataParam("song_taal") String song_taal,
	            @FormDataParam("song_singer") String song_singer,
	            @FormDataParam("song_composer") String song_composer,
	            @FormDataParam("song_url") String song_url) throws SQLException, IOException { 
			
			System.out.println("its working MP3--"+song_id);
			
			String imge_path= PathModel.IMG_PATH;
			String filePath = context.getRealPath("images/"); 
			String sRootPath = new File("images/").getAbsolutePath();
			System.out.println("path-1-- "+song_url);
			
			
			  // String str1=song_url;
			   String newStr="";
			   if(!song_url.equals("")) {
				  String str1=song_url;
			      String str= new String(str1);
			      newStr=str.substring(0,8);
			   }
			  
			  //variables
			  String fileLocation ="";
			  
			  String img_url = song_url;
			 
				
			  
			  
		         //  System.out.println("google drive upload-2"+fileDetail.getFileName().equals("null") );
		    	   DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		   		   Date date = new Date();
		   		   
		   		   
		   		   System.out.println("substring--"+fileDetail.getFileName());
		   		   
		           if(img_url.equals("") || fileDetail.getFileName() != null) {
		        	   System.out.println("direct upload from local disk");
		        	  String ext2 = getFileExtension(fileDetail); // returns "exe"
		        	  
		        	  fileLocation = filePath+"/"+song_name+"_"+dateFormat.format(date)+"."+ext2; 
		              // fileLocation = "C:/Users/EHRC/Desktop/imgUpload/" +dateFormat.format(date)+"."+ext2; 
		        	   
		        	   try {  
		                   FileOutputStream out = new FileOutputStream(new File(fileLocation));  
		                   int read = 0;  
		                   byte[] bytes = new byte[1024];  
		                   out = new FileOutputStream(new File(fileLocation));  
		                   while ((read = uploadedInputStream.read(bytes)) != -1) {  
		                       out.write(bytes, 0, read);  
		                   }  
		                   out.flush();  
		                   out.close();  
		               } catch (IOException e) {e.printStackTrace();}  
		        	   
		        	   
		           }else if(newStr.equals("https://") && fileDetail.getFileName() == null ) {
		        	   System.out.println("google drive upload-1"+img_url);
		        	   fileLocation = saveImage(img_url,song_name,1,dateFormat.format(date));
		           }else {
		        	   
		        	   System.out.println("they did't upload"); 
		        	   fileLocation = song_url;
		        	   
		           }
	           
	           
	           DatabaseConnection dbconn = new DatabaseConnection();
	   		if(! dbconn.isStatus()){
	   			dbconn.closeAll();
	   			return Response.status(210).entity("DBError").build();
	   		}
	   		
	   		String Img_new_path = imge_path+""+fileLocation.substring(fileLocation.lastIndexOf('/') + 1);
	   		song_url = song_url.replace("open?","uc?export=download&");
	   		song_url = song_url.replace("file/d/","uc?export=download&id=");
	   		song_url = song_url.replace("/view?usp=drivesdk","");
	   		String query = "update song set song_name = '"+song_name+"',song_url='"+Img_new_path+"',song_raaga = '"+song_raaga+"',song_taal = '"+song_taal+"',song_singer = '"+song_singer+"',song_composer = '"+song_composer+"' where song_id = '"+song_id+"'";
	   		System.out.println(query);
	   		dbconn.getStmt().executeUpdate(query);
	   		dbconn.closeAll();
	   		return Response.status(201).entity("success").build(); 
	        }  
			
	//GetCurrent file path
		public String getPath() throws UnsupportedEncodingException {
			String path = this.getClass().getClassLoader().getResource("").getPath();
			String fullPath = URLDecoder.decode(path, "UTF-8");
			String pathArr[] = fullPath.split("/WEB-INF/classes/");
			System.out.println("full -- "+fullPath);
			System.out.println("full__ "+pathArr[0]);
			fullPath = pathArr[0];
			String reponsePath = "";
			// to read a file from webcontent
			reponsePath = new File(fullPath).getPath() + File.separatorChar + "newfile.txt";
			return reponsePath;
			}
	
	
	
	
	
	private static String getFileExtension(FormDataContentDisposition fileDetail) {
        String fileName = fileDetail.getFileName();
        if(fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0)
        return fileName.substring(fileName.lastIndexOf(".")+1);
        else return "";
    }
	
	
	
	public String  saveImage(String imageUrl, String playlist,int flag ,String filename1) throws IOException {
		URL url = new URL(imageUrl);
		String fileName = url.getFile();
		//System.out.println("fileName--"+fileName);
		//System.out.println("fileName-extrect from link-"+fileName.substring(fileName.lastIndexOf("/")));
		//String destName = "./figures" + fileName.substring(fileName.lastIndexOf("/")); 
		
		
		String imge_path= PathModel.IMG_PATH;
		String filePath = context.getRealPath("images/"); 
		String sRootPath = new File("images/").getAbsolutePath();
		//System.out.println("path-1-- "+recording_pic_url);
		
		
		
		
		
		String destName ="";
		if(flag==1) {
			
			 destName = filePath+"/"+playlist+"_"+filename1+".mp3";
			 System.out.println("mp4");
		}else {
			
			 destName = filePath+"/"+playlist+"_"+filename1+".png";	
			 System.out.println("imge");
			
		}
		
		//System.out.println(destName);
		
		
	 
		InputStream is = url.openStream();
		//System.out.println("is-1"+is);
		OutputStream os = new FileOutputStream(destName);
		//System.out.println("is"+is);
	 
		byte[] b = new byte[2048];
		int length;
	 
		while ((length = is.read(b)) != -1) {
			os.write(b, 0, length);
		}
	 
		is.close();
		os.close();
		return destName;
	}
		
		
}
