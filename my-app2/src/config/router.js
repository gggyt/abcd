import React from 'react';

const localhost = "http://localhost:9999"
export const AddNew = localhost+"/news/addNews";
export const SelectClass = localhost+"/news/selectClass";
export const DeleteClass = localhost+"/news/deleteNews";

export const AddAnnounce = localhost+"/announce/addAnnounce";
export const UpdateAnnounce = localhost+"/announce/updateAnnounce";
export const SelectAnnounce = localhost+"/announce/selectAnnounce";
export const DeleteAnnounce = localhost+"/announce/deleteAnnounce";
export const AnnounceDetail = localhost+"/announce/detail";
export const UpdateAnnounceFirst = localhost+"/announce/updateFirst";

export const AddNewsMain = localhost+"/news/addNewMain";
export const DeleteNewMain = localhost+"/news/deleteNewMain";
export const UpdateNewsMain = localhost+"/news/updateNewMain";
export const SelectNewsMain = localhost+"/news/selectNewsMain";
export const NewsDetail = localhost+"/news/detail";

export const SelectUser = localhost+"/userLogin/selectUser";
export const PassUser = localhost+"/userLogin/passUser";
export const NotPassUser = localhost+"/userLogin/notPassUser";
export const BeAdmin = localhost+"/userLogin/beAdmin";
export const BePlayer = localhost+"/userLogin/bePlayer";
export const UserInfo = localhost+"/userLogin/userInfo";
export const UploadUserImg = localhost+"/userLogin/updateUserImage";
export const UploadUserImgByMy = localhost+"/userLogin/updateUserImageByMy";
export const UpdateUserInfo = localhost+"/userLogin/updateUserInfo";

export const UploadImg = localhost+"/uploadImg";
export const UploadImg1 = localhost+"/uploadImg1";

export const AddAlbum = localhost+"/album/addAlbum";
export const SelectAlbum = localhost+"/album/selectAlbum";
export const DeleteAlbum = localhost+"/album/deleteAlbum";
export const AlbumDetail = localhost+"/album/AlbumDetail";

export const AddPhoto = localhost+"/photo/addPhoto";
export const SelectPhoto = localhost+"/photo/selectPhoto";
export const DeletePhoto = localhost+"/photo/deletePhoto";
export const BeCover = localhost+"/photo/beCover";

export const AddInvitation = localhost+"/invitation/addInvitation";
export const SelectInvivation = localhost+"/invitation/selectInvitation";
export const GetInvitationDetail = localhost+"/invitation/invitationDetail";
export const DeleteInvitation = localhost+"/invitation/deleteInvitation";

export const GetUserInfo = localhost+"/userLogin/getUserInfo";

export const AddComment = localhost+"/comment/addComment";
export const SelectComment = localhost+"/comment/selectComment";

export const SelectDayDuty = localhost+"/dayDuty/selectDayDuty";

export const AddCompetitionUrl = localhost+"/competition/addCompetition";
export const UpdateCompetitionUrl = localhost+"/competition/updateCompetition";
export const SelectCompetitionUrl = localhost+"/competition/selectCompetition";
export const DeleteCompetitionUrl = localhost+"/competition/deleteCompetition";
export const DetailCompetitionUrl = localhost+"/competition/detailCompetition";
export const JoinCompetitionUrl = localhost+"/competition/joinCompetition";
export const DoneCompetitionUrl = localhost+"/competition/doneCompetition";
export const PersonCompetitionUrl = localhost+"/competition/personCompetition";