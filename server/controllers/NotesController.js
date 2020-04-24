import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { notesService } from '../services/NotesService';
export class NoteController extends BaseController {
  constructor() {
    super("api/notes")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.createNote)
      // .put('/:id', this.editNote)
      // .delete('/:id', this.deleteNote)
  }

  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await notesService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }
  async createNote(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await notesService.createNote(req.body)
      return res.send(data)

    } catch (error) { next(error) }
  }
  async editNote(req, res, next) {
    try {
      let data = await notesService.editNote(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  // async deleteNote(req, res, next) {
  //   try {
  //     await notesService.deleteNote(req.params.id, req.userInfo.email)
  //     return res.send("Successfully deleted!!!!!!!!!!")
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}